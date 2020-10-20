#!/usr/bin/env node
'use strict';

const Task = require("./schema/task");
const Note = require("./schema/note");
const storage = require("./storage");
const validator = require("./validator");


const createTask = async (task) => {
    if(validator.Empty(task)) {
        console.log("Invalid Input");
        return;
    }
    const structuredTask = await reshapeItem(task, "TASK");
    storage.storeItem(structuredTask);
};

const createNote = async (note) => {
    if(validator.Empty(note)) {
        console.log("Invalid Input");
        return;
    }
    const structuredNote = await reshapeItem(note, "NOTE");
    storage.storeItem(structuredNote);
};


const reshapeItem = async (item, type) => {
    let newItem = new Object();
    const length = Object.keys(item).length;
    
    if(type === "NOTE") {
        newItem = new Note();
    }
    else if(type === "TASK") {
        newItem = new Task();
    }

    newItem._description = item[0];

    if(length == 2) {
        if(validator.Board(item[1])) {
            newItem._board = item[1].substring(2);
        }
        else if(validator.Priority(item[1])) {
            newItem._priority = parseInt(item[1].substring(2));
        }
    }
    else if(length == 3) {
        if(validator.Board(item[1])) {
            newItem._board = item[1].substring(2);
        }
        if(validator.Priority(item[2])) {
            newItem._priority = parseInt(item[2].substring(2));
        }
    }
    return newItem;
};


module.exports = { createTask, createNote };