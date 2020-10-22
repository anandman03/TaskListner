#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const messages = require("./messages");
const validator = require("./validator");
const getDate = require("./helpers/getDate");


const findItem = async (item) => {
    const value = item.join(' ').trim();

    if(validator.validInt(value)) {
        await viewTask();
    }
    else {
        await viewBoard();
    }
};

const viewTimeline = async (item) => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);

    const dates = new Set();
    for(const task of list) {
        dates.add(task._date);
    }
    for(const date of dates) 
    {
        messages.boardTitle(date);
        for(const item of list) 
        {
            if(date === item._date) 
            {
                const task = await makeObject(item);
                messages.viewTask(task, item._type);
            }
        }
    }
};

const displayItems = async () => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);

    const dashBoards = new Set();
    for(const task of list) {
        dashBoards.add(task._board);
    }
    for(const board of dashBoards) 
    {
        messages.boardTitle(board);
        for(const item of list) 
        {
            if(board === item._board) 
            {
                const task = await makeObject(item);
                messages.viewTask(task, item._type);
            }
        }
    }
};

const makeObject = async (item) => {
    const task = {
        id: item._id,
        desc: item._description,
        days: getDate.calculateDays(item._date)
    };
    return task;
};

const viewTask = async (value) => {
    const list = await storage.getTaskList();
    for(const task of list) {
        if(value == task._id) {
            console.log(task);
        }
    }
};

const viewBoard = async (value) => {
    const list = await storage.getTaskList();
    for(const task of list) {
        if(value == task._board) {
            console.log(task);
        }
    }
};


module.exports = {
    findItem,
    viewTimeline,
    displayItems,
};