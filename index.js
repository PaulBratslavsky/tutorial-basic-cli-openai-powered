#!/usr/bin/env node
console.log("Hello CLI World");
require('dotenv').config();

// Initialize OpenAI Start
const configureOpenAi = require('./openai.js');
const openai = configureOpenAi(process.env.OPEN_AI_TOKEN);
// Initialize OpenAI End

const services = require('./services.js');

const { program } = require("commander");

// Define the CLI tool version
program.version("1.0.0");

// Define a command to interact with OpenAI text completion service
program
  .command("complete <prompt>")
  .description("Generate text completion based on the provided prompt")
  .action(async (prompt) => {
    try {
      const completion = await services.createCompletion(openai, prompt);
      console.log(completion);
    } catch (error) {
      console.error("Error generating completion:", error);
    }
  });

// Parse command line arguments
program.parse(process.argv);