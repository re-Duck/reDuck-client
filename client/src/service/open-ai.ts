import OpenAI from 'openai';

async function getCodeReview({
  code,
  question,
}: {
  code: string;
  question: string;
}) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_API,
    dangerouslyAllowBrowser: true,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `${code} \n ${question} ` }],
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
  });

  return completion.choices[0].message.content;
}
export default getCodeReview;
