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

const Invalid = () => signale.error(chalk.red.bold('Invalid Input'));

const boardTitle = (name) => boxen(chalk.rgb(255,0,255)(`${name}`), boxOptions);

const TaskEmpty = () => signale.error("You have No Task");

const viewTask = (item, type) =>  {
    if(type === "NOTE") {
        // console.log
        signale.note(chalk.yellowBright(`${item.id}. ${item.desc} (${item.date})`));
    }
    else if(type === "TASK") {
        signale.pending(chalk.yellowBright(`${item.id}. ${item.desc} (${item.date})`));
    }
};

module.exports = { Success, Invalid, boardTitle, viewTask, TaskEmpty };