import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase JSON body limit to allow selfie base64 image data (up to 10MB)
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Photo Analysis for Cartoon Avatar Creation
app.post('/api/gemini/analyze-photo', async (req: Request, res: Response) => {
  try {
    const { photoBase64 } = req.body;
    if (!photoBase64) {
      return res.status(400).json({ error: 'No photo provided' });
    }

    if (!ai) {
      // Graceful fallback avatar traits
      return res.json({
        success: true,
        fallback: true,
        traits: {
          skinTone: '#FCD34D',
          hairColor: '#451A03',
          hairStyle: 'short-spike',
          hairLength: 'short',
          eyeColor: '#2A1048',
          glasses: false,
          glassesStyle: 'none',
          facialHair: false,
          smileType: 'wide',
          suggestedOutfitColor: '#6C2BD9',
        },
      });
    }

    // Strip data:image/...;base64, prefix if present
    const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, '');

    const prompt = `You are an expert game character designer. Analyze this selfie photo and output stylized cartoon traits for a vibrant, hand-crafted 2D game hero avatar.
Return STRICT JSON ONLY matching this structure:
{
  "skinTone": "#FCD34D" (one of: "#FDE68A", "#FCD34D", "#F59E0B", "#D97706", "#B45309", "#78350F"),
  "hairColor": "#451A03" (one of: "#1E293B", "#451A03", "#D97706", "#DC2626", "#6C2BD9", "#FF3D5A"),
  "hairStyle": "short-spike" (one of: "short-spike", "curly-afro", "bob-cut", "wavy-long", "cap", "ponytail"),
  "hairLength": "short" (one of: "short", "medium", "long"),
  "eyeColor": "#2A1048",
  "glasses": false (true if wearing eyeglasses or sunglasses),
  "glassesStyle": "none" (one of: "round", "square", "none"),
  "facialHair": false,
  "smileType": "wide" (one of: "wide", "gentle", "cool"),
  "suggestedOutfitColor": "#6C2BD9" (one of: "#6C2BD9", "#FF3D5A", "#22C55E", "#B8F23A", "#FFC93C", "#FF6FB5")
}
Do not include any other markdown or text. JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data,
          },
        },
        { text: prompt },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, traits: parsed });
  } catch (error: any) {
    console.error('Photo analysis error:', error?.message || error);
    // Graceful fallback to default traits
    return res.json({
      success: true,
      fallback: true,
      traits: {
        skinTone: '#FCD34D',
        hairColor: '#451A03',
        hairStyle: 'short-spike',
        hairLength: 'short',
        eyeColor: '#2A1048',
        glasses: false,
        glassesStyle: 'none',
        facialHair: false,
        smileType: 'wide',
        suggestedOutfitColor: '#6C2BD9',
      },
    });
  }
});

// 2. Pet as Real Agent: Brain Decision Endpoint
app.post('/api/gemini/agent-decision', async (req: Request, res: Response) => {
  try {
    const { learnerHistory, currentPet, lastTopicId, score, retries, hintsUsed } = req.body;

    if (!ai) {
      // Deterministic agentic evaluator
      const isStruggling = score < 3 || retries > 1 || hintsUsed > 2;
      const isConfident = score === 5 && hintsUsed === 0;

      return res.json({
        success: true,
        decision: {
          decisionId: 'dec-' + Date.now(),
          timestamp: new Date().toISOString(),
          observedPattern: isStruggling
            ? 'Noticed challenge with foundational concepts and question phrasing.'
            : isConfident
            ? 'Demonstrated rapid mastery with high accuracy and zero hints!'
            : 'Steady, methodical progress across learning milestones.',
          nextAction: isStruggling ? 'revision' : 'advance',
          teachingStyle: isStruggling ? 'analogy' : isConfident ? 'step-by-step' : 'real-life example',
          difficultyAdjustment: isStruggling ? 'easier' : isConfident ? 'harder' : 'same',
          learnerState: isStruggling ? 'frustrated' : isConfident ? 'confident' : 'curious',
          miniGameAdjustment: {
            speed: isStruggling ? 4.5 : isConfident ? 6.5 : 5.5,
            hazardDensity: isStruggling ? 'gentle' : isConfident ? 'challenging' : 'balanced',
            coinMultiplier: isStruggling ? 1.5 : 1.0,
          },
          petThought: isStruggling
            ? `I noticed that last quiz had some tricky curveballs! Let's try with a fun everyday analogy, and I'll keep the mini-game obstacles friendly so we can collect more coins!`
            : isConfident
            ? `Calculations confirm: you're on fire! I'm boosting the realm speed and unlocking advanced challenges!`
            : `Great pace! Keep up the momentum, companion!`,
          nextStepsPlan: [
            isStruggling ? 'Review core concept using visual analogies' : 'Explore next frontier level',
            'Complete targeted 3-question Revision Quest',
            'Take a spin through Realm Runner for bonus coins',
          ],
        },
      });
    }

    const prompt = `You are the agentic AI companion pet in "Play Tales", an educational game.
Observe the learner's performance:
- Last Topic: ${lastTopicId || 'None'}
- Score: ${score}/5
- Retries: ${retries || 0}
- Hints Used: ${hintsUsed || 0}
- Companion Type: ${currentPet?.name || 'Pet'}
- History Summary: ${JSON.stringify(learnerHistory || {})}

Make an autonomous pedagogical decision for the learner.
Output STRICT JSON:
{
  "decisionId": "dec-123",
  "timestamp": "${new Date().toISOString()}",
  "observedPattern": "1-2 sentence breakdown of what you noticed about how this learner learns",
  "nextAction": "advance" | "revision" | "break",
  "teachingStyle": "analogy" | "real-life example" | "step-by-step" | "story" | "simple words",
  "difficultyAdjustment": "easier" | "same" | "harder",
  "learnerState": "frustrated" | "bored" | "confident" | "curious",
  "miniGameAdjustment": {
    "speed": 5.0,
    "hazardDensity": "gentle" | "balanced" | "challenging",
    "coinMultiplier": 1.0
  },
  "petThought": "Warm 2-sentence conversational explanation from the pet explaining WHY it chose this adaptation",
  "nextStepsPlan": ["Step 1", "Step 2", "Step 3"]
}
JSON only, no markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, decision: parsed });
  } catch (error: any) {
    console.error('Agent decision error:', error);
    return res.json({
      success: true,
      decision: {
        decisionId: 'dec-' + Date.now(),
        timestamp: new Date().toISOString(),
        observedPattern: 'Continuous steady engagement across topics.',
        nextAction: 'advance',
        teachingStyle: 'real-life example',
        difficultyAdjustment: 'same',
        learnerState: 'curious',
        miniGameAdjustment: { speed: 5.5, hazardDensity: 'balanced', coinMultiplier: 1.0 },
        petThought: 'Ready for our next quest! I will be by your side cheering for every answer!',
        nextStepsPlan: ['Advance to next stage', 'Earn bonus coins', 'Feed pet in sanctuary'],
      },
    });
  }
});

// 3. Spaced Revision Quest Generator
app.post('/api/gemini/revision-questions', async (req: Request, res: Response) => {
  try {
    const { weakConcepts, topicTitle, domain } = req.body;

    if (!ai) {
      return res.json({
        questions: [
          {
            id: 'rev-q1',
            question: `In ${topicTitle}, what is the key principle to keep in mind?`,
            options: ['Consistency & syntax', 'Random guessing', 'Skipping steps', 'Hardcoding everything'],
            correctIndex: 0,
            hint: 'Think about steady rule-following.',
            explanation: 'Mastering the fundamental structure is what makes solutions work reliably.',
          },
          {
            id: 'rev-q2',
            question: `Which approach best prevents mistakes when practicing ${topicTitle}?`,
            options: ['Checking results line-by-line', 'Closing your eyes', 'Ignoring errors', 'Deleting the project'],
            correctIndex: 0,
            hint: 'Verification is key!',
            explanation: 'Step-by-step verification catches errors early.',
          },
          {
            id: 'rev-q3',
            question: `Why is this concept crucial in real-world ${domain}?`,
            options: ['It builds logical precision', 'It is never used', 'It only works in tests', 'It deletes data'],
            correctIndex: 0,
            hint: 'It forms the building blocks for bigger apps and games.',
            explanation: 'Core concepts form the reliable foundation for all software and sciences.',
          },
        ],
      });
    }

    const prompt = `Create EXACTLY 3 targeted multiple-choice revision questions for a learner who previously struggled with: "${weakConcepts || topicTitle}" in domain "${domain}".
Questions must test the concept from a fresh, practical angle.
Output STRICT JSON:
{
  "questions": [
    {
      "id": "rev-1",
      "question": "Clear question text...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "hint": "Gentle encouraging hint",
      "explanation": "Why this option is correct"
    }
  ]
}
JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    return res.json({ fallback: true, questions: [] });
  }
});

// 4. Adaptive Explanation & "Explain Differently"
app.post('/api/gemini/explain', async (req: Request, res: Response) => {
  try {
    const { domain, topic, difficulty = 'easy', teachingStyle = 'analogy', language } = req.body;

    if (!ai) {
      return res.json({ fallback: true });
    }

    const prompt = `You are a warm, witty educational guide in "Play Tales".
Create a handcrafted, colorful micro-lesson on:
- Domain: ${domain} ${language ? `(${language})` : ''}
- Topic: ${topic}
- Difficulty: ${difficulty}
- Teaching Style to emphasize: ${teachingStyle} (e.g. use rich analogies, relatable everyday stories, or step-by-step clarity).

Structure as STRICT JSON:
{
  "title": "${topic}",
  "tagline": "Playful punchy 1-line quest summary",
  "whatIsIt": "Clear 2-sentence explanation emphasizing the ${teachingStyle} style",
  "whyItMatters": "Why this superpower is awesome in games and real life",
  "howItWorks": "3 short, punchy bullet sentences",
  "quickExample": "Concrete code snippet or illustrative real-world scenario",
  "rememberThis": "The single golden takeaway"
}
JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, data: JSON.parse(response.text || '{}') });
  } catch {
    return res.json({ fallback: true });
  }
});

// 5. "Why is that wrong?" / "Explain Differently" endpoint
app.post('/api/gemini/explain-differently', async (req: Request, res: Response) => {
  try {
    const { question, chosenOption, correctOption, explanation, mode } = req.body;

    if (!ai) {
      if (mode === 'why-wrong') {
        return res.json({
          response: `You picked "${chosenOption}". While tempting, this doesn't work because it doesn't satisfy the fundamental rule. Remember that "${correctOption}" fits because it directly matches the definition!`,
        });
      }
      return res.json({
        response: `Let's picture it like this: Imagine you are packing a backpack. "${correctOption}" is the sturdy container that holds everything in place without spilling!`,
      });
    }

    const prompt = mode === 'why-wrong'
      ? `A learner answered "${chosenOption}" to the question: "${question}".
The correct answer is "${correctOption}".
In 2-3 warm, friendly sentences, explain gently why "${chosenOption}" is incorrect and why "${correctOption}" is right. Never shame the player.`
      : `Re-explain the concept behind this question using a completely fresh analogy or real-life story:
Question: "${question}"
Correct Answer: "${correctOption}"
Keep it under 3 concise, fun sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ response: response.text || 'Keep exploring with an open mind!' });
  } catch {
    return res.json({ response: 'Let’s try breaking it down into smaller steps together!' });
  }
});

// 6. Interactive "Ask AI" endpoint
app.post('/api/gemini/ask-ai', async (req: Request, res: Response) => {
  try {
    const { question, topic, domain } = req.body;
    if (!ai) {
      return res.json({
        answer: `Great question about ${topic}! Understanding this concept will boost your score and unlock realm stages!`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are the lively AI guide in the educational game "Play Tales".
Learner asked about "${topic}" in "${domain}": "${question}".
Respond in 2-3 super engaging, warm sentences.`,
    });

    return res.json({ answer: response.text || 'Keep discovering, wayfarer!' });
  } catch {
    return res.json({ answer: 'Great question! Practice makes mastery!' });
  }
});

// 7. Pet Talk Endpoint
app.post('/api/gemini/pet-talk', async (req: Request, res: Response) => {
  try {
    const { petType, petName, playerMessage, petMood = 'happy' } = req.body;

    if (!ai) {
      const defaultReplies: Record<string, string> = {
        dog: `*Wags tail joyfully* Woof! I'm observing your study rhythm and cheering for you!`,
        cat: `*Purrs playfully* Meow! My analytical paws detect sharp progress in your thinking!`,
        robot: `*Antenna lights pulse green* BEEP BOOP! Synapses synchronized! Ready for optimal learning!`,
      };
      return res.json({ reply: defaultReplies[petType] || 'Ready for our next adventure!' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are ${petName}, an agentic AI companion pet (${petType}) in "Play Tales". Mood: ${petMood}.
Player said: "${playerMessage || 'Hello companion!'}".
Reply in-character in 1-2 lively, concise sentences.`,
    });

    return res.json({ reply: response.text || 'Yay! Ready for our next lesson!' });
  } catch {
    return res.json({ reply: 'I am always by your side!' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Play Tales server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
