import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.name, req.body.type),
    temperature: 0.6,
    max_tokens: 500,
  });
  // console.log(completion.data);
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(name, type) {
  const capitalizedName =
    name[0].toUpperCase() + name.slice(1).toLowerCase();
  if(type === 'poem') {
    return `Write a short Christmas poem featuring ${capitalizedName}`
  }
  return `Make a Christmas limerick about someone called ${capitalizedName}`;
}
