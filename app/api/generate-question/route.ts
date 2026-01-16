import { NextRequest, NextResponse } from 'next/server';
import Portkey from 'portkey-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check for API key and provider
    const apiKey = process.env.PORTKEY_API_KEY;
    const provider = process.env.PORTKEY_PROVIDER || '@azure-openai-bbfaac';
    const model = process.env.PORTKEY_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Portkey API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Portkey client
    const portkey = new Portkey({
      apiKey: apiKey,
      provider: provider,
    });

    // Call AI via Portkey
    const chatCompletion = await portkey.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: `You are an expert at creating educational sequencing challenges for trades and technical training. Generate a sequencing question based on the user's prompt.

The question should have:
1. A clear title (short, descriptive)
2. A detailed description explaining the scenario
3. A starting point (initial state description)
4. An ending point (goal state description)
5. Between 4-8 correct action steps in proper order
6. 2-4 distractor steps (incorrect actions)
7. Each action should have:
   - A short label (action name)
   - An appropriate emoji icon
   - Optional feedback text (for correct actions only)

Respond ONLY with valid JSON in this exact format:
{
  "title": "string",
  "description": "string",
  "startingPoint": "string",
  "endingPoint": "string",
  "maxSteps": number,
  "actions": [
    {
      "label": "string",
      "icon": "emoji",
      "feedback": "string (optional)",
      "isCorrect": boolean,
      "correctOrder": number (only if isCorrect is true, 0-indexed)
    }
  ]
}

Make it realistic, practical, and educational. Include safety considerations if relevant.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let questionData;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questionData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      return NextResponse.json(
        { error: 'Failed to parse AI response', details: content },
        { status: 500 }
      );
    }

    // Validate the structure
    if (!questionData.title || !questionData.description || !questionData.actions || !Array.isArray(questionData.actions)) {
      return NextResponse.json(
        { error: 'Invalid question structure from AI' },
        { status: 500 }
      );
    }

    // Ensure maxSteps matches correct actions count
    const correctActionsCount = questionData.actions.filter((a: any) => a.isCorrect).length;
    questionData.maxSteps = correctActionsCount;

    return NextResponse.json({ question: questionData });

  } catch (error) {
    console.error('Error generating question:', error);
    
    // Check if it's a Portkey-specific error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to generate question' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
