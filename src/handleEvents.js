#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const Task = require("./schema/task");
const Note = require("./schema/note");
const messages = require("./messages");
const validator = require("./validator");


const createTask = async (task) => {
    validator.emptyObject(task);
    const structuredTask = await structureItem(task, "TASK");
    storage.storeItem(structuredTask);
};

const createNote = async (note) => {
    validator.emptyObject(note);
    const structuredNote = await structureItem(note, "NOTE");
    storage.storeItem(structuredNote);
};

const removeItem = async (item) => {
    validator.emptyObject(item);
    const list = await storage.getTaskList();
    validator.emptyContainer(list);

    const itemIndex = parseInt(item[0]);
    validator.compareLength(itemIndex, list);
    
    storage.deleteItem(itemIndex-1);
};

const markDone = async (ID) => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);
    validator.compareLength(ID, list);
    if(list[ID-1]._type === "NOTE") {
        messages.cantComplete();
        return;
    }
    await storage.updateCompleteStatus(ID-1);
};

const updatePriority = async (ID) => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);
    validator.compareLength(ID, list);
    if(list[ID-1]._type === "NOTE") {
        messages.cantComplete();
        return;
    }
    await storage.updateCompleteStatus(ID-1);
};


const structureItem = async (item, type) => {
    let newItem = new Object();
    if(type === "NOTE") {
        newItem = new Note();
    }
    else if(type === "TASK") {
        newItem = new Task();
    }

    const list = await storage.getTaskList();
    newItem._id = list.length + 1;
 
    const desc = await getDescription(item);
    validator.emptyContainer(desc);
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

module.exports = { 
    createTask, 
    createNote,
    removeItem,
    markDone,
    updatePriority,
};