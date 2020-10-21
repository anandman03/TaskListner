#!/usr/bin/env node
'use strict';

const chalk = require("chalk");
const boxen = require("boxen");
const signale = require("signale");

const boxOptions = {
    margin: 0,
    padding: 0,
    float: "left",
    align: "center",
    dimBorder: false,
    borderStyle: "bold",
    borderColor: "white",
};

signale.config({
    displayLabel: false,
});

const Success = (type) => signale.debug(chalk.white.bold(`added ${String(type).toLocaleLowerCase()} successfully.`));

const Deletion = (index) => signale.debug(chalk.white.bold(`removed ${index} successfully.`));

const update = (index) => signale.debug(chalk.white.bold(`update ${index} successfully.`));

const Invalid = () => signale.error(chalk.red.bold('Invalid Input'));

const boardTitle = (name) => console.log(boxen(chalk.rgb(255,0,255)(`${name}`), boxOptions));

const TaskEmpty = () => signale.error("You have No Task");

const TaskNotFound = (index) => signale.error(`Task with ID: ${index} not found`);

const cantComplete = () => signale.error(`Task with ID: ${index} not found`);

const viewTask = (item, type) =>  {
    if(type === "NOTE") {
        signale.note(chalk.yellowBright(`${item.id}. ${item.desc} (${item.days}d)`));
    }
    else if(type === "TASK") {
        // signale.pending(chalk.yellowBright(`${item.id}. ${item.desc} (${item.days}d)`));
        signale.success({
            prefix: chalk.gray(`${item.id}.`), 
            message: chalk.gray(`${item.desc}`), 
            suffix: chalk.grey(`(${item.days}d)`)
        });
    }
};

// signale.complete({prefix: '[task]', message: 'Fix issue #59', suffix: '(@klauscfhq)'});

module.exports = { Success, Deletion, Invalid, boardTitle, viewTask, TaskEmpty, TaskNotFound, cantComplete, update };