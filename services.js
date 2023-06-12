module.exports = {
  createCompletion: async function (openai, prompt) {
    console.log("Creating completion...");

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 3500,
    });

    console.log("Completion created!");
    return completion.data.choices[0].text;
  }
}