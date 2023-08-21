const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.chatGpt = async (query) => {
  console.log(process.env.OPENAI_API_KEY)
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}