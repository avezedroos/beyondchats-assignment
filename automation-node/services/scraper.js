import axios from "axios";
import * as cheerio from "cheerio";

const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Cache-Control": "max-age=0"
};

export async function scrapeArticleContent(url) {
  try {
    const res = await axios.get(url, {
      headers: browserHeaders,
      timeout: 20000,
      maxRedirects: 5,
      validateStatus: status => status < 500,
    });

    if (res.status === 403 || res.status === 429) {
      console.warn(`🚫 Blocked (${res.status}) → Skipping:`, url);
      return "";
    }

    if (!res.data || typeof res.data !== "string") return "";

    const $ = cheerio.load(res.data);

    $(
      "script, style, noscript, iframe, svg, nav, footer, header, aside, form, .ads, .advertisement, .cookie"
    ).remove();

    let content =
      $("article").first().html() ||
      $(".entry-content").first().html() ||
      $(".post-content").first().html() ||
      $(".post-body").first().html() ||
      $("main").first().html();

    if (!content) {
      const paragraphs = [];
      $("p").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 100) {
          paragraphs.push(`<p>${text}</p>`);
        }
      });
      content = paragraphs.join("");
    }

    // ✅ only trim size (main fix)
    return content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);

  } catch (err) {
    console.error("❌ Scrape failed:", url);
    console.error("Reason:", err.message);
    return "";
  }
}

