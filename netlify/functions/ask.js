/**
     * Interview Question Generator
     * ─────────────────────────────
     * Calls the Google's Gemini with a focused prompt,
     * parses the numbered list from the response, and renders
     * three question cards with staggered animations.
     */

// Always load this from an environment variable in production!
const apiKey = process.env.GEMINI_API_KEY;
  
// The native endpoint requires the model name in the URL itself
const MODEL = "gemini-2.5-flash"; // or your preferred model
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/**
 * Build the system + user prompt.
 * We keep this focused and explicit so the model returns
 * a clean numbered list that's easy to parse.
 */
function buildMessages(jobTitle) {
  return [
    {
      role: "user",
	  parts: [
        {text:
          `You are an experienced hiring manager conducting a structured interview.\n` +
          `Generate exactly 3 thoughtful, open-ended interview questions for a candidate ` +
          `applying for the role of "${jobTitle}".\n\n` +
          `Requirements:\n` +
          `- Each question should target a distinct competency (e.g. problem-solving, ` +
          `stakeholder communication, handling adversity, domain knowledge, etc.)\n` +
          `- Questions should be specific to the responsibilities of a "${jobTitle}" ` +
          `— avoid generic questions that could apply to any role\n` +
          `- Use open-ended, behavioural or situational framing (e.g. "Tell me about a time…" ` +
          `or "How would you approach…")\n\n` +
          `Format your response as a plain numbered list:\n` +
          `1. [Question]\n` +
          `2. [Question]\n` +
          `3. [Question]\n\n` +
          `Return only the three questions. No preamble, no commentary.`}]
    }
  ];
}

/**
 * Call the Anthropic Messages API.
 * Returns the assistant's text content as a string.
 * Throws on HTTP errors or unexpected response shapes.
 */
exports.handler = async (event) => {
  const { jobTitle } = JSON.parse(event.body);
  
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json",
	  "x-goog-api-key": apiKey
	},
    body: JSON.stringify({
      contents: buildMessages(jobTitle),
	  generationConfig: {
        maxOutputTokens: 6144,
      }
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return { statusCode: 200, body: JSON.stringify(data) };

}

