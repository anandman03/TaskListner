#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const messages = require("./messages");
const validator = require("./validator");
const getDate = require("./helpers/getDate");

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

module.exports = { displayBoards };