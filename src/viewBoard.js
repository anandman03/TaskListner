#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const messages = require("./messages");
const validator = require("./validator");
const getDate = require("./helpers/getDate");


const findItem = async (item) => {
    const value = item.join(' ').trim();
    const list = await storage.getTaskList();

    if(validator.validInt(value)) {
        for(const task of list) {
            if(value == task._id) {
                console.log(task);
            }
        }
    }
    else {
        for(const task of list) {
            if(value == task._board) {
                console.log(task);
            }
        }
    }
};

const viewTimeline = async (item) => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);

    const dates = new Set();
    for(const task of list) {
        dates.add(task._date);
    }
    for(const date of dates) {
        messages.boardTitle(date);
        for(const item of list) {
            if(date === item._date) {
                const task = {
                    id: item._id,
                    desc: item._description,
                    days: getDate.calculateDays(item._date)
                };
                messages.viewTask(task, item._type);
            }
        }
    }
};

const displayBoards = async () => {
    const list = await storage.getTaskList();
    validator.emptyContainer(list);

    const dashBoards = new Set();
    for(const task of list) {
        dashBoards.add(task._board);
    }
    for(const board of dashBoards) {
        messages.boardTitle(board);
        for(const item of list) {
            if(board === item._board) {
                const task = {
                    id: item._id,
                    desc: item._description,
                    days: getDate.calculateDays(item._date)
                };
                messages.viewTask(task, item._type);
            }
        }
    }
};

module.exports = {
    findItem,
    viewTimeline,
    displayBoards,
};