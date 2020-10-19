#!/usr/bin/env node
'use strict';

const Task = require("./task");
const storage = require("./storage");
const validator = require("./validator");


const createTask = async (task) => {
    if(validator.Empty(task)) {
        console.log("Invalid Input");
        return;
    }
    const structuredTask = await reshapeTask(task);
    storage.storeItem(structuredTask);
};

const createNotes = async () => {

};


const reshapeTask = async (task) => {
    const temporaryTask = new Task();
    const length = Object.keys(task).length;
    
    temporaryTask._description = task[0];

    if(length == 2) {
        if(validator.ValidInt(task[1]) && validator.Priority(task[1])) {
            temporaryTask._priority = parseInt(task[1]);
        }
        else if(!validator.ValidInt(task[1])) {
            temporaryTask._board = task[1];
        }
    }
    else if(length == 3) {
        if(validator.ValidInt(task[1]) && validator.Priority(task[1])) {
            temporaryTask._priority = task[1];
        }
        if(validator.ValidString(task[2])) {
            temporaryTask._board = task[2];
        }
    }
    return temporaryTask;
};


module.exports = { createTask, createNotes };