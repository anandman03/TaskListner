#!/usr/bin/env node
'use strict';

const meow = require("meow");
const help = require("./src/helpers/help");
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
        },
        note: {
            type: "boolean",
            alias: "n"
        }
    }
});

taskListner(cli.flags, cli.input);