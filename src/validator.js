#!/usr/bin/env node
'use strict';

const Priority = (p) => {
    const priority = parseInt(p);
    if(priority >= 1 && priority <= 3) {
        return true;
    }
    return false;
};

const ValidString = (s) => {
    return Number.isNaN(parseInt(s));
};

const ValidInt = (num) => {
    return !Number.isNaN(parseInt(num));
};

module.exports = { Priority, ValidString, ValidInt };