#!/usr/bin/env node
'use strict';

const handler = require("./src/handleEvents");

const taskListner = (flags, input) => {
    if(flags.task) {
        handler.createTask(input);
    }
    else if(flags.note) {
        handler.createNote(input);
    }
    else {
        handler.displayBoards();
    }
};

module.exports = taskListner;