import "dotenv/config";
import { fetchLatestArticle, publishUpdatedArticle } from "./services/laravel.js";
import { searchGoogle } from "./services/google.js";
import { scrapeArticleContent } from "./services/scraper.js";
import { rewriteArticle } from "./services/llm.js";

async function runAutomation() {
  console.log("📥 Fetching latest article...");
  const article = await fetchLatestArticle();

  console.log("🔍 Searching Google...");
  const results = await searchGoogle(article.title);
  console.log("results",results)
  if (results.length < 2) {
  throw new Error("❌ Not enough valid reference articles found");
}

  console.log("🌐 Scraping reference articles...");
  const ref1 = await scrapeArticleContent(results[0].link);
  const ref2 = await scrapeArticleContent(results[1].link);
if(!ref1 || !ref2 ){
   throw new Error("❌ content not scrap ");
}

    console.log("ref1",ref1,"ref2",ref2)

  console.log("🤖 Calling LLM...");
  const updatedContent = await rewriteArticle(
    article.content,
    ref1,
    ref2
  );

  if (!updatedContent || updatedContent.length < 100) {
  throw new Error("LLM returned empty or weak content");
}

  const finalContent = `
${updatedContent}
<hr/>
<h3>References</h3>
<ul>
  <li><a href="${results[0].link}" target="_blank">${results[0].title}</a></li>
  <li><a href="${results[1].link}" target="_blank">${results[1].title}</a></li>
</ul>
`;

  console.log("📤 Publishing updated article...");
  await publishUpdatedArticle({
    title: article.title + " (Updated)",
    content: finalContent,
    is_updated: true,
    references: results.map(r => r.link),
  });

  console.log("✅ Automation completed successfully!");
}

runAutomation().catch(console.error);
