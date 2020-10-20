#!/usr/bin/env node
'use strict';

const fs = require("fs");
const messages = require("./messages");
const pathConfig = require("./helpers/pathConfig");

const storeItem = async (task) => {
    if(!fs.existsSync(pathConfig.filePath)) {
        await saveItemInFile([task], task);
    }
    else {
        const taskList = require(pathConfig.filePath);
        taskList.push(task);
        await saveItemInFile(taskList, task);
    }
};

const saveItemInFile = async (task, ob) => {
    fs.writeFile(pathConfig.filePath, JSON.stringify(task), err => {
        if(err) throw err;
        messages.Success(ob._type);
    });
};

module.exports = { storeItem };