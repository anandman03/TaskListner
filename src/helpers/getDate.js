#!/usr/bin/env node
'use strict';

const currDate = new Date();

const formatedDate = currDate.getUTCDate() + "/" + (currDate.getUTCMonth() + 1) + "/" + currDate.getUTCFullYear();

module.exports = formatedDate;