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


const Success = (type) => signale.success(chalk.white.bold(`Added 1 ${type}.`));

const Invalid = () => signale.error(chalk.red.bold('Invalid Input'));

const boardTitle = (name) => boxen(chalk.rgb(255,0,255)(`${name}`), boxOptions);

const viewTask = (task) => chalk.yellowBright(`${task.id}. ${task.desc} (${task.date})`);

const TaskEmpty = () => signale.error("You have No Task");

module.exports = { Success, Invalid, boardTitle, viewTask, TaskEmpty };