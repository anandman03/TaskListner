#!/usr/bin/env node
'use strict';

const fs = require("fs");
const signale = require("signale");
const pathConfig = require("./pathConfig");

const storeItem = async (task) => {
    if(!fs.existsSync(pathConfig.filePath)) {
        fs.writeFileSync(pathConfig.filePath, JSON.stringify([task]), "utf8");
    }
    else {
        const taskList = require(pathConfig.filePath);
        taskList.push(task);
        fs.writeFile(pathConfig.filePath, JSON.stringify(taskList), err => {
            if(err) throw err;
            signale.success("Success!!");
        });
    }
};

module.exports = { storeItem };