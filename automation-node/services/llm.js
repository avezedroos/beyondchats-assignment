import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* 🔒 small helper (added) */
function limitText(text = "", maxChars) {
  return text.length > maxChars ? text.slice(0, maxChars) : text;
}

export async function rewriteArticle(original, ref1, ref2) {
  // ✅ LIMIT INPUT SIZE (main fix)
  original = limitText(original, 3500);
  ref1 = limitText(ref1, 1500);
  ref2 = limitText(ref2, 1500);

  const prompt = `
You are an expert SEO content writer.

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1 (ideas only, do not copy):
${ref1}

REFERENCE ARTICLE 2 (ideas only, do not copy):
${ref2}

TASK:
- Rewrite the article with better structure and clarity
- Improve SEO without keyword stuffing
- Do NOT plagiarize reference articles
- Use proper HTML tags (h2, h3, ul, li, p)
- Add a strong conclusion
- Return ONLY clean HTML (no markdown, no explanation)
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 900,
  });

  return response.choices[0].message.content.trim();
}
