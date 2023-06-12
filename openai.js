// openai.js
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({ apiKey: apiKey });
  return new OpenAIApi(configuration);
}

module.exports = configureOpenAi;
