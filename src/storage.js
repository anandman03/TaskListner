#!/usr/bin/env node
'use strict';

const fs = require("fs");
const messages = require("./messages");
const pathConfig = require("./helpers/pathConfig");

const storeItem = async (task) => {
    if(!FileExist()) {
        await saveItemInFile([task], task, -1, "C");
    }
    else {
        const taskList = require(pathConfig.filePath);
        taskList.push(task);
        await saveItemInFile(taskList, task, -1, "C");
    }
};

const deleteItem = async (index) => {
    let taskList = require(pathConfig.filePath);
    taskList.splice(index, 1);
    for(let i = index ; i < taskList.length ; i++) {
        taskList[i]._id -= 1;
    }
    await saveItemInFile(taskList, {}, index+1, "D");
};

const saveItemInFile = async (task, ob, index, type) => {
    fs.writeFile(pathConfig.filePath, JSON.stringify(task), err => {
        if(err) throw err;
        if(type === "C") {
            messages.Success(ob._type);
        }
        if(type === "D") {
            messages.Deletion(index);
        }
    });
};

const FileExist = () => {
     return fs.existsSync(pathConfig.filePath);
};

module.exports = { storeItem, deleteItem, FileExist };