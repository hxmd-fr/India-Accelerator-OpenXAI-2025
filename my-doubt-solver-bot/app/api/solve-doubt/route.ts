import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // This is the prompt that will be sent to the Llama 3 model
    const prompt = `You are a helpful assistant for students. Provide a clear and concise step-by-step solution to the following question. Be as helpful as possible. Question: ${question}`;

    // Make a request to the Ollama API
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:latest',
        prompt: prompt,
        stream: false, // Set to true if you want to stream the response
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API Error:', errorText);
      return NextResponse.json({ error: 'Failed to get a response from the AI model.' }, { status: response.status });
    }

    const data = await response.json();
    const finalAnswer = data.response;

    return NextResponse.json({ answer: finalAnswer });
  } catch (error) {
    console.error('Request Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}