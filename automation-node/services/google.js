// services/google.js
import axios from "axios";
import * as cheerio from "cheerio";

function extractRealUrl(ddgUrl) {
  try {
    if (!ddgUrl) return null;

    // Skip DuckDuckGo internal / ads
    // if (ddgUrl.includes("duckduckgo.com")) return null;

    if (ddgUrl.startsWith("//")) {
      ddgUrl = "https:" + ddgUrl;
    }

    const parsed = new URL(ddgUrl);
    const real = parsed.searchParams.get("uddg");

    if (!real) return null;

    const decoded = decodeURIComponent(real);

    // ❌ Block bad sources
    const blocked = [
      "amazon.",
      "flipkart.",
      "abebooks.",
      ".pdf",
      "youtube.",
      "facebook.",
      "twitter.",
      "medium."
    ];

    if (blocked.some(b => decoded.includes(b))) return null;

    return decoded;
  } catch {
    return null;
  }
}


export async function searchGoogle(query) {
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
console.log("urlma",url)
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  // console.log("url",url)
  // console.log("data", data)

  const $ = cheerio.load(data);
  const results = [];

  $(".result__a").each((_, el) => {
    if (results.length >= 2) return;

    const title = $(el).text();
    const rawLink = $(el).attr("href");
    console.log("rawLink ------ ",rawLink)
    const link = extractRealUrl(rawLink);

    if (link  && link.startsWith("http")) {
      results.push({ title, link });
    }
  });

  return results;
}
