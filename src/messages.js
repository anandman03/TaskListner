#!/usr/bin/env node
'use strict';

const chalk = require("chalk");
const boxen = require("boxen");
const signale = require("signale");

const Success = (type) => signale.success(chalk.white.bold(`Added 1 ${type}.`));

const Invalid = () => signale.error(chalk.red.bold('Invalid Input'));

module.exports = { Success, Invalid };