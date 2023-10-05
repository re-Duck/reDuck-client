import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getCodeReview({
  code,
  question,
}: {
  code: string;
  question: string;
}) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `${code} \n ${question} ` }],
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
  });

  return completion.choices[0].message.content;
}
export default getCodeReview;
