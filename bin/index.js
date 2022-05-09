#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const inquirer = require("inquirer");

const greeting = chalk.white.bold("Welcome to TUTORIAL-G!");

const boxenOptions = {
 padding: 1,
 margin: 2,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);

'use strict';
const output = [];
const command_list = ["git add", "git commit", "git_push", "git stash"];

const questions = [
  {
    type: 'input',
    name: 'command',
    message: "Write your command according to the syntax",
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: '(just hit enter to continue/ type "n" to exit)',
    default: true,
  },
];

function ask() {
  inquirer.prompt(questions).then((answers) => {
    if (command_list.includes(answers.command)){
        output.push(answers.command);
    }else {
        console.log(chalk.red.bold("The given command is wrong please refer the commands again \n"));
    }
    if (answers.askAgain) {
      ask();
    } else {
        const endBox = boxen(chalk.green.bold("Thank you for joining"), boxenOptions);
      console.log(endBox);
    }
  });
}

ask();
