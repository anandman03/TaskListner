#!/usr/bin/env node
'use strict';

const meow = require("meow");
const help = require("./src/help");
const taskListner = require("./index");

const cli = meow(help, {
    flags: {
        help: {
            type: "boolean",
            alias: "h"
        },
        version: {
            type: "boolean",
            alias: "v"
        },
        task: {
            type: "boolean",
            alias: "t"
        }
    }
});

taskListner(cli.flags, cli.input);