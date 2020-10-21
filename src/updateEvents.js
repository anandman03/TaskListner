#!/usr/bin/env node
'use strict';

const storage = require("./storage");
const messages = require("./messages");
const validator = require("./validator");


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

module.exports = { markDone, updatePriority };