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
        messages.Invalid();
        return;
    }
    const structuredNote = await structureItem(note, "NOTE");
    storage.storeItem(structuredNote);
};

const displayBoards = () => {
    const taskListner = (storage.FileExist()) ? require(pathConfig.filePath) : [];
    if(taskListner.length === 0) {
        messages.TaskEmpty();
        return;
    }

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


const structureItem = async (item, type) => {
    let newItem = new Object();
    if(type === "NOTE") {
        newItem = new Note();
    }
    else if(type === "TASK") {
        newItem = new Task();
    }

    const TL = (storage.FileExist()) ? require(pathConfig.filePath) : [];
    newItem._id = TL.filter(ob => ob._type === type).length + 1;
 
    const desc = await getDescription(item);
    if(desc.length === 0) {
        messages.Invalid();
        return;
    }
    newItem._description = desc;

    const db = await getDashboard(item);
    if(db !== null) {
        newItem._board = db;   
    }

    const priority = await getPriority(item);
    if(priority !== null) {
        newItem._priority = priority;
    }

    return newItem;
};

const getDescription = async (item) => {
    let description = new Array();
    for(const str of item) {
        if((str[0] === 'p' || str[0] === 'b') && str[1] === ':') {
            break;
        }
        description.push(str);
    }
    return description.join(' ').trim();
};

const getDashboard = async (item) => {
    const str = item.join(' ');
    let index = str.indexOf("b:");
    if(index === -1) {
        return null;
    }
    let board = new String();
    for(let i = index + 2 ; i < str.length ; i++) {
        if(str[i] === 'p' && str[i+1] === ':') {
            break;
        }
        board += str[i];
    }
    return board.trim();
};

const getPriority = async (item) => {
    for(const str of item) {
        if(str.substring(2) === "p:") {
            return str[2].trim();
        }
    }
    return null;
};

module.exports = { createTask, createNote, displayBoards };