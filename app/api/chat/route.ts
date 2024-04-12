import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { OpenAIStream, StreamingTextResponse, AnthropicStream } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Set the runtime to edge for best performance
//export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  /*   const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [...messages, { role: 'system', content: 'The code must be a react app, styled with tailwindcss. Return ONLY the code of the App.js file and NOT as markdown formated text.' }],
    }); */

  const response = await anthropic.messages.create({
    system: 'Give me the code snippet with no additional text or formatting. your answer is neither markdown nor a codeblock. remove ```jsx and ```',
    messages: [{ role: 'user', content: `${messages[0].content} The App.js must be a react app, styled with tailwindcss.` }],
    model: 'claude-3-haiku-20240307',
    stream: true,
    max_tokens: 3000,
  });

  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

