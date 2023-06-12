
# How To Build A Simple CLI Tool Powered By Chat GPT.

A CLI, or Command Line Interface, is a type of user interface that allows users to interact with a program by entering commands in the form of text lines. It operates in a text-based environment, usually a terminal or console, where users input commands and receive text responses from the program.

## What Are We Going To Build

We are going to build a simple CLI tool that will allow us to use chat gpt via CLI.

## Prerequisites

Make sure that you have node and npm installed. We will use it to download necessary packages that we need for you CLI.

``` shell
	node -v
	npm -v
```

## Getting Started

Create directory for you CLI tool:

``` shell
	mkdir gpt-cli
	cd gpt-cli
```

Let's initialize our project by running `npm init`

``` shell
	npm init
```

Follow thought the steps.

``` shell
➜  gpt-cli npm init
This utility will walk you through creating a package.json file.

It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

// Complete the following steps and add any relevent information

package name: (gpt-cli)
version: (1.0.0)
description: Simple CLI tool to use with chat gpt
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/paulbratslavsky/Desktop/gpt-cli/package.json:

{
  "name": "gpt-cli",
  "version": "1.0.0",
  "description": "Simple CLI tool to use with chat gpt",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

Change directories in to the root of your project and open in your favorite code editor, which we all know is `vim`.  Just kidding.  

Open your project in VS Code. 

We should only have the `package.json` file that we just created.

Once your project is open go ahead and create an entry file called `index.js`

## What Is Cammander

You can learn more about `commander` [here](https://www.npmjs.com/package/commander)

`commander` is a popular Node.js package that helps to build command-line interfaces (CLIs) in an easy and organized manner. 

It simplifies the process of parsing command-line arguments, defining commands, handling flags, options, and displaying help documentation.

Let's go ahead and install it now by running the following command:

``` shell
npm install commander
```

Once commander is installed let's start building out our CLI.

Once commander is installed let's start building out our CLI.

## Make Your Script Executable

Add the following at the top of your `index.js` file:

``` javasript
#!/usr/bin/env node
```

This command tells our operating system to use `node` to execute our command.

Now update your `package.json` file to include the following code:

```json
"bin": { "gpt-cli": "./index.js" },
```

The above command will alow us to run our cli by typing `gpt-cli` in our terminal.

But before we can get it to work. We need to install it globally by creating a global symlink. We can do it by running the following command:

``` shell
npm link
```

Now before testing it out. Let's add a simple console.log in our `index.js` file

```javascript
#!/usr/bin/env node
console.log("Hello CLI World");
```

note: if you need to unlink your CLI tool you can run the following command:

```bash
npm unlink <name-of-package>
```

example:

```bash
npm unlink gpt-cli
```

we can test our CLI tool by running the following:

```bash
gpt-cli
```


## Let's now a package to allow us to use .env variables in Node.

``` shell
	npm install dotenv
```

Eventually we will add propers settings functionality but for this basic introduction we will do it this way.

Let's set our test env variable.  In the root of your project create a file called `.env` and add a test variable, we will call ours `OPEN_AI_TOKEN`

Now, let's make sure we can console our variable.

In the `index.js` file add the following code.

``` javascript
	require('dotenv').config();
	
	const apiKey = process.env.OPEN_AI_TOKEN;
	console.log(apiKey)
```

You should now be able to see your `.env` test variable in the console when running the code.

## Commander Template Example

Let's set up `commander` example so we can use it as reference as we build out our cli command tool.

Let's enter the following code below.

```javascript
#!/usr/bin/env node
console.log("Hello CLI World");

require('dotenv').config();
	
const apiKey = process.env.OPEN_AI_TOKEN;
console.log(apiKey)

const { program } = require("commander");

// Define the CLI tool version
program.version("1.0.0");

// Define a command with options and a description
program
  .command("greet <name>")
  .option("-c, --capitalize", "Capitalize the name")
  .description("Greets the user with their name")
  .action((name, options) => {
    let output = `Hello, ${options.capitalize ? name.toUpperCase() : name}!`;
    console.log(output);
  });

// Parse command line arguments
program.parse(process.argv);
```

The cool part about commander is that it automatically creates help documentation.

You can run the help command with the following code:

```bash
gpt-cli help
```

Output:

``` shell
➜  gpt-cli gpt-cli           
Hello CLI World
this is a secret
➜  gpt-cli gpt-cli help
Hello CLI World
this is a secret
Usage: gpt-cli [options] [command]

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  greet [options] <name>  Greets the user with their name
  help [command]          display help for command
```

Let's test out our `commander` tool, type in the following:

```bash
gpt-cli greet -c paul
```

Output:

```bash
Hello CLI World
Hello, PAUL!
```

Now that we have the basic down. Lets install `openai` npm package.

**note:** if you don't have an open ai account, go ahead and create one [here](https://openai.com/blog/openai-api).

We are going to use the `openai` npm package that you can find [here](https://www.npmjs.com/package/openai)

We can install it by running the following command.

``` shell 
	npm install openai
```

Once the package is installed, let's created `openai.js` file where we will add the code below to initialize our open ai settings with our credentials.  

`openai.js`

``` javascript

const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
	const configuration = new Configuration({ apiKey: apiKey });
	return new OpenAIApi(configuration);
}

module.exports = configureOpenAi;
```

Now let's make the following changes in the `index.js` file.

``` javascript
// Initialize OpenAI Start
const configureOpenAi = require('./openai.js');
const openai = configureOpenAi(process.env.OPEN_AI_TOKEN);
console.log(openai);
// Initialize OpenAI End
```

The final code should look like the following.

``` javascript
#!/usr/bin/env node

console.log("Hello CLI World");
require('dotenv').config();

// Initialize OpenAI Start
const configureOpenAi = require('./openai.js');
const openai = configureOpenAi(process.env.OPEN_AI_TOKEN);
console.log(openai);
// Initialize OpenAI End

const { program } = require("commander");

// Define the CLI tool version
program.version("1.0.0");

// Define a command with options and a description
program
.command("greet <name>")
.option("-c, --capitalize", "Capitalize the name")
.description("Greets the user with their name")
.action((name, options) => {
		let output = `Hello, ${options.capitalize ?name.toUpperCase() : name}!`;
console.log(output);
});

// Parse command line arguments
program.parse(process.argv);
``` 

## Let's create a file to handle Chat GPT Logic.

We will create a file called `services.js` where we can add additional services that we would like.  

Inside the file let's add the following code that will do a basic text completion.

`services.js`
``` javascript
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
```

This function will take our `openai` settings and `prompt` as arguments.

Let's now utilize our service inside our `index.js` file.

First let's import our services file.

``` javascript
	const services = require('./services.js');
```

Next let's create the `commander` code to use our service in our cli.

We will replace our previous `commander` test code, with the following.
``` javascript
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
```

The following code should look like the following.

``` javascript
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
```

Hope you enjoyed this basic tutorial on how to make a CLI tool powered by open ai API.



# tutorial-basic-cli-openai-powered
