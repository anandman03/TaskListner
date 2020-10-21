#!/usr/bin/env node
'use strict';

const handler = require("./src/handleEvents");
const updater = require("./src/updateEvents");

const taskListner = (flags, input) => {
    if(flags.task) {
        handler.createTask(input);
    }
    else if(flags.note) {
        handler.createNote(input);
    }
    else if(flags.remove) {
        handler.removeItem(input);
    }
    else if(flags.done) {
        updater.markDone(parseInt(input[0]));
    }
    else if(flags.priority) {
        updater.updatePriority(parseInt(input[0]));
    }
    else {
        handler.displayBoards();
    }
};

module.exports = taskListner;