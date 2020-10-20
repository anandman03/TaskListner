#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const Task = require("./schema/task");
const Note = require("./schema/note");
const messages = require("./messages");
const validator = require("./validator");
const pathConfig = require("./helpers/pathConfig");


const createTask = async (task) => {
    if(validator.Empty(task)) {
        messages.Invalid();
        return;
    }
    const structuredTask = await structureItem(task, "TASK");
    storage.storeItem(structuredTask);
};

const createNote = async (note) => {
    if(validator.Empty(note)) {
        console.log("Invalid Input");
        return;
    }
    const structuredNote = await structureItem(note, "NOTE");
    storage.storeItem(structuredNote);
};


const structureItem = async (item, type) => {
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

const displayBoards = () => {
    const taskListner = require(pathConfig.filePath);
    const dashBoards = new Set();
    for(const task of taskListner) {
        dashBoards.add(task._board);
    }
    for(const board of dashBoards) {
        console.log(messages.boardTitle(board));
        for(const item of taskListner) {
            if(board === item._board) {
                const task = {
                    id: item._id,
                    desc: item._description,
                    date: item._date,
                };
                console.log(messages.viewTask(task));
            }
        }
    }
};


module.exports = { createTask, createNote, displayBoards };