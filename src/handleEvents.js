#!/usr/bin/env node
'use strict';

const Task = require("./task");
const validator = require("./validator");


const createTask = async (task) => {
    console.log(task);
    const structuredTask = await reshapeTask(task);
    console.log(structuredTask);
};

const createNotes = async () => {

};


const reshapeTask = async (task) => {
    const temporaryTask = new Task();
    const length = Object.keys(task).length;
    
    if(!validator.ValidString(task[0])) {
        console.log("Invalid Input :)");
        return;
    }
    else {
        temporaryTask._description = task[0];
    }

    if(length == 2) {
        temporaryTask._description = task[0];
        if(validator.ValidInt(task[1]) && validator.Priority(task[1])) {
            temporaryTask._priority = parseInt(task[1]);
        }
        else if(!validator.ValidInt(task[1])) {
            temporaryTask._board = task[1];
        }
    }
    else if(length == 3) {
        temporaryTask._description = task[0];
        temporaryTask._board = task[1];
        temporaryTask._priority = parseInt(task[2]);
    }
    else {
        console.log("Invalid Input");
    }
    return temporaryTask;
};


module.exports = { createTask, createNotes };