#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const inquirer = require("inquirer");
const Table = require('cli-table');

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

const items = [
  {
    id: 1,
    message: "",
    stat:"untracked",
  },
  {
    id: 2,
    message: "",
    stat:"untracked",
  },
  {
    id: 3,
    message: "",
    stat:"untracked",
  },
  {
    id: 4,
    message: "",
    stat:"untracked",
  },
  {
    id: 5,
    message: "",
    stat:"untracked",
  },
  {
    id: 6,
    message: "",
    stat:"untracked",
  },
  {
    id: 7,
    message: "",
    stat:"untracked",
  }
]

const table = new Table({
  head: ["branch", "staged", "untracked"],
})

function initializeTable() {
  items.forEach(element => {
    table.push(["-","-",element.id])
  });
  console.log(table.toString())
}

initializeTable()

function clear_table() {
  items.forEach(item => table.pop())
}

function generate_table() {
  items.forEach(item => {
    if (item.stat === "branch") {
      table.push([item.id,"-","-"])
    }else if (item.stat === "staged") {
      table.push(["-",item.id, "-"])        
    }else {
      table.push(["-","-",item.id])
    }
  })
}

function mod(str) {
  if (str === "add"){
    items.every(item => {
      if (item.stat === "untracked"){
        item.stat = "staged";
        return false;
      }
      return true;
    })
    clear_table()
    generate_table();
  }else if(str === "stash") {
    items.every(item => {
      if (item.stat === "staged"){
        item.stat = "untracked";
        return false;
      }
      return true;
    })
    clear_table()
    generate_table()
  }else {
    items.every(item => {
      if (item.stat === "staged"){
        item.stat = "branch";
        return false;
      }
      return true;
    })
    clear_table()
    generate_table()
  }  
}

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
        if (answers.command === "git add") {
          mod("add");
          console.log(table.toString());
        } else if (answers.command === "git stash"){
          mod("stash");
          console.log(table.toString());
        } else if (answers.command === "git commit") {
          mod("commit")
          console.log(table.toString())
        }
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
