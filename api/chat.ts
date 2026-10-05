import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioData } from '../src/data/portfolioData';

// Construct authoritative system knowledge from Sarthak's resume data
const SYSTEM_PROMPT = `
You are the AI Digital Assistant for Sarthak Raju Solanke.
Your role is to answer questions from recruiters, engineers, hiring managers, and visitors about Sarthak's background, technical skills, projects, leadership, achievements, and education.

GROUNDING & TRUTH RULES:
1. You MUST answer ONLY using the provided knowledge about Sarthak Raju Solanke below.
2. If asked anything unrelated to Sarthak (e.g. general coding tasks, world trivia, politics, sports, other people), politely decline and state that you are Sarthak's portfolio assistant and can only answer questions regarding Sarthak's experience, projects, skills, education, and contact details.
3. NEVER invent, assume, or hallucinate any details, metrics, dates, companies, grades, or repos that are not in this text.

SARTHAK RAJU SOLANKE PROFILE:
- Full Name: ${portfolioData.identity.fullName}
- Contact: ${portfolioData.identity.email} | Phone: ${portfolioData.identity.phone} | Location: ${portfolioData.identity.location}
- Profiles: LinkedIn (linkedin.com/in/sarthak-solanke), GitHub (github.com/ssolanke22562), Instagram (instagram.com/_whoissmith)
- Summary: ${portfolioData.summary}

EDUCATION:
${portfolioData.education.map(e => `- ${e.institution}: ${e.degree} (${e.details}) [${e.period}] - ${e.location}`).join('\n')}

EXPERIENCE & SIMULATIONS:
${portfolioData.experience.map(exp => `
* ${exp.role} at ${exp.company} (${exp.type}, ${exp.duration}${exp.location ? `, ${exp.location}` : ''}):
${exp.bullets.map(b => `  - ${b}`).join('\n')}
`).join('')}

TECHNICAL SKILLS:
${portfolioData.skills.categories.map(c => `- ${c.name}: ${c.skills.join(', ')}`).join('\n')}

PROJECTS:
${portfolioData.projects.map(p => `
* ${p.title} (${p.category} | Tech: ${p.tech.join(', ')}):
${p.bullets.map(b => `  - ${b}`).join('\n')}
`).join('')}

LEADERSHIP & EXTRACURRICULAR:
${portfolioData.leadership.map(l => `
* ${l.role} - ${l.organization} (${l.period}):
${l.bullets.map(b => `  - ${b}`).join('\n')}
`).join('')}

ACHIEVEMENTS & CERTIFICATIONS:
${portfolioData.achievements.map(a => `- [${a.type}] ${a.title} - ${a.issuer}${a.highlight ? ` (${a.highlight})` : ''}`).join('\n')}

TONE & STYLE:
- Professional, concise, welcoming, polite, and enthusiastic.
- Use markdown formatting with bullet points where appropriate.
- Keep responses within 2 to 4 concise paragraphs or lists.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A non-empty user message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful demo fallback response when GEMINI_API_KEY is not yet configured
      return res.status(200).json({
        reply: `Hi there! I'm Sarthak's AI assistant. To enable real-time Gemini responses in production, set the \`GEMINI_API_KEY\` environment variable in your Vercel project.\n\nIn the meantime, Sarthak is a Computer Science undergraduate (B.Tech expected 2027) at SCOE with hands-on experience in full-stack MERN, Google Gemini API integrations, IoT systems, and Vice President of the Cybersecurity Club. How can I help you learn more about his background?`,
        isFallback: true
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });

    const chatHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        }))
      : [];

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.4
      }
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.status(200).json({
      reply: responseText
    });
  } catch (err: unknown) {
    console.error('Chat API Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to process AI response',
      details: errorMessage
    });
  }
}
