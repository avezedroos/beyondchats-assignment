import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://beyondchats.com";
const BLOGS_URL = `${BASE_URL}/blogs/`;

// Laravel API URL
const LARAVEL_API = "http://127.0.0.1:8000/api/articles";

async function saveToLaravel(blog) {
  try {
    // console.log("blog",blog)
    const res = await axios.post(LARAVEL_API, {
      title: blog.title,
      content: blog.content,
      image: blog.image,
      published_at: blog.date,
    });

    console.log(`✅ Saved to Laravel: ${blog.title}`);
  } catch (err) {
    console.error("❌ Error saving:", blog.title, err.message);
  }
}


/**
 * Fetch HTML from URL
 */
async function fetchHTML(url) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  return cheerio.load(data);
}

/**
 * Step 1: Get Last Page Number Dynamically
 */
async function getLastPageNumber() {
  const $ = await fetchHTML(BLOGS_URL);

  let maxPage = 1;

  $(".ct-pagination a.page-numbers").each((_, el) => {
    const text = $(el).text().trim();
    const pageNum = parseInt(text, 10);

    if (!isNaN(pageNum) && pageNum > maxPage) {
      maxPage = pageNum;
    }
  });

  return maxPage;
}

/**
 * Step 2: Get Last 5 Blog Cards (even if last page has < 5)
 */
async function getOldestBlogCards(lastPage) {
  let collectedBlogs = [];
  let currentPage = lastPage;

  while (collectedBlogs.length < 5 && currentPage >= 1) {
    const pageUrl =
      currentPage === 1
        ? BLOGS_URL
        : `${BLOGS_URL}page/${currentPage}/`;

    const $ = await fetchHTML(pageUrl);
    const articles = $("article.entry-card").toArray();

    // iterate from bottom (oldest first)
    for (let i = articles.length - 1; i >= 0; i--) {
      if (collectedBlogs.length === 5) break;

      const el = articles[i];

      const title = $(el).find(".entry-title a").text().trim();
      const url = $(el).find(".entry-title a").attr("href");
      const image = $(el).find(".ct-media-container img").attr("src");
      const date = $(el)
        .find("time.ct-meta-element-date")
        .attr("datetime");

      collectedBlogs.unshift({ title, url, image, date });
    }

    currentPage--;
  }

  return collectedBlogs;
}

/**
 * Helper: Get first existing element and return **plain text**
 */
function getFirstExistingText($, selectors = []) {
  for (const selector of selectors) {
    const el = $(selector);
    if (el.length > 0) {
      // .text() automatically strips HTML tags
      return el.text().trim() || "";
    }
  }
  return "";
}


function cleanText(rawText) {
  return rawText
    .replace(/\r\n|\r/g, "\n")      // normalize Windows/Mac line endings
    .replace(/\n\s*\n/g, "\n\n")    // collapse multiple empty lines
    .replace(/\t/g, "")              // remove tabs
    .trim();
}

/**
 * Step 3: Scrape Full Blog Content as plain text
 */
/**
 * Step 3: Scrape Full Blog Content as CLEAN HTML
 */
async function scrapeBlogContent(url) {
  const $ = await fetchHTML(url);

  const contentSelectors = [
    ".ct-content",
    ".entry-content",
    ".post-content",
    ".content-area",
    "main article",
    "article",
  ];

  let contentHTML = "";

  for (const selector of contentSelectors) {
    const el = $(selector).first();

    if (el.length > 0) {
      // ❌ Remove unwanted elements
      el.find(
        "script, style, iframe, noscript, .social, .share-buttons, .ads, .comment",
        
  ".share",
  
 " .ct-share",
  ".ct-socials",
  ".wp-social",
  ".social-icons",
 " .icon",
  ".icons",
  

      ).remove();

      // ✅ OPTIONAL: remove inline styles & classes
      el.find("*").removeAttr("style").removeAttr("class");

      // ✅ Get HTML instead of text
      contentHTML = el.html()?.trim();

      if (contentHTML) break;
    }
  }

  if (!contentHTML) {
    console.warn("⚠️ Content not found for:", url);
  }

  return contentHTML;
}



/**
 * MAIN EXECUTION
 */
async function runScraper() {
  try {
    console.log("🔍 Finding last page...");
    const lastPage = await getLastPageNumber();
    console.log(`✅ Last page found: ${lastPage}`);

    console.log("📄 Fetching last 5 blogs...");
    const blogs = await getOldestBlogCards(lastPage);

    const fullBlogs = [];

    for (const blog of blogs) {
      console.log(`🧠 Scraping: ${blog.title}`);
      // console.log("blog",blog,"image",blog.image)
      const content = await scrapeBlogContent(blog.url);

      if (!content || content.length < 50) {
        console.warn("⚠️ Skipping empty content:", blog.title);
        continue;
      }

      const blogData = {
        title: blog.title,
        content: content,
        image: blog.image,
        date: blog.date,
      };

      fullBlogs.push(blogData);
      await saveToLaravel(blogData);
    }

    // console.log("\n🎉 SCRAPED BLOG DATA:\n");
    // console.log(JSON.stringify(fullBlogs, null, 2));
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}


runScraper();
