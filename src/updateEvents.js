#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const messages = require("./messages");


const markDone = async (ID) => {
    const list = await storage.getTaskList();
    if(list.length === 0) {
        messages.TaskEmpty();
        return;
    }
    if(list.length < ID) {
        messages.TaskNotFound(ID);
        return;
    }
    if(list[ID-1]._type === "NOTE") {
        messages.cantComplete();
        return;
    }
    await storage.updateCompleteStatus(ID-1);
};

module.exports = { markDone };