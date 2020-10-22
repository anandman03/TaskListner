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

const newLine = () => {
    console.log('\n');
}

const creation = (task) => {
    signale.debug({
        prefix: '\n', 
        message: chalk.whiteBright(`Created ${String(task._type).toLocaleLowerCase()}: ${task._id}`), 
        suffix: '\n'
    });
};

const deletion = (ID) => {
    signale.debug({
        prefix: '\n', 
        message: chalk.whiteBright(`Removed item: ${ID}`), 
        suffix: '\n'
    });
};

const updation = (ID) => {
    signale.debug({
        prefix: '\n', 
        message: chalk.whiteBright(`Updated item: ${ID}`), 
        suffix: '\n'
    });
};

const invalid = (ID) => {
    signale.error({
        prefix: '\n', 
        message: chalk.redBright('Invalid Input'), 
        suffix: '\n'
    });
};

const boardTitle = (name) => {
    console.log('\n');
    console.log(boxen(chalk.rgb(255,0,255)(`${name}`), boxOptions));
};

const taskEmpty = () => {
    newLine();
    signale.error(chalk.whiteBright('Type `tl --help` to get started!'));
    taskCompleteData(0);
    overView(0, 0, 0);
    newLine();
};

const taskNotFound = (ID) => {
    signale.error({
        prefix: '\n', 
        message: chalk.whiteBright(`Unable to find item with id: ${ID}`), 
        suffix: '\n'
    });
};

const taskCompleteData = (percent) => {
    signale.fav({
        prefix: '\n', 
        message: chalk.gray(`${percent}% of the tasks complete.`)
    });
};

const overView = (done, pending, notes) => {
    const Done = chalk.green(`${done}`);
    const Pending = chalk.magenta(`${pending}`);
    const Notes = chalk.blue(`${notes}`);
    const message = chalk.gray(`${Done} done  |  ${Pending} pending  |  ${Notes} notes`);
    console.log(message);
};

const viewTask = (item, type) =>  {
    if(type === "NOTE") {
        signale.note({
            prefix: chalk.gray(`${item.id}.`), 
            message: chalk.gray(`${item.desc}`), 
            suffix: chalk.gray(`(${item.days}d)`)
        });
    }
    else if(type === "TASK") {
        signale.success({
            prefix: chalk.gray(`${item.id}.`), 
            message: chalk.gray(`${item.desc}`), 
            suffix: chalk.gray(`(${item.days}d)`)
        });
    }
};

module.exports = {
    newLine,
    invalid,
    creation,
    deletion,
    viewTask,
    updation,
    overView,
    taskEmpty,
    boardTitle,
    taskNotFound,
    taskCompleteData
};