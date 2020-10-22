#!/usr/bin/env node
'use strict';

const handler = require("./src/handleEvents");
const display = require("./src/viewBoard");

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
        handler.markDone(parseInt(input[0]));
    }
    else if(flags.priority) {
        handler.updatePriority(parseInt(input[0]));
    }
    else {
        display.displayBoards();
    }
};

module.exports = taskListner;