#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const Task = require("./schema/task");
const Note = require("./schema/note");
const messages = require("./messages");
const validator = require("./validator");
const getDate = require("./helpers/getDate");


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

const removeItem = async (item) => {
    if(validator.Empty(item)) {
        messages.Invalid();
        return;
    }
    const TL = await storage.getTaskList();
    if(TL.length === 0) {
        messages.TaskEmpty();
        return;
    }
    const itemIndex = parseInt(item[0]);
    if(itemIndex > TL.length) {
        messages.TaskNotFound(item[0]);
        return;
    }
    storage.deleteItem(itemIndex-1);
};

const displayBoards = async () => {
    let taskListner = await storage.getTaskList();
    if(taskListner.length === 0) {
        messages.TaskEmpty();
        return;
    }

    const dashBoards = new Set();
    for(const task of taskListner) {
        dashBoards.add(task._board);
    }
    for(const board of dashBoards) {
        messages.boardTitle(board);
        for(const item of taskListner) {
            if(board === item._board) {
                const task = {
                    id: item._id,
                    desc: item._description,
                    days: getDate.calculateDays(item._date)
                    // days: item._date
                };
                messages.viewTask(task, item._type);
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

    const TL = await storage.getTaskList();
    newItem._id = TL.length + 1;
 
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

module.exports = { createTask, createNote, displayBoards, removeItem };