#!/usr/bin/env node
'use strict';

const Priority = (p) => {
    const priority = parseInt(p.substring(2));
    return (priority >= 1 && priority <= 3 && p[0] === 'p');
};

const ValidString = (s) => {
    return Number.isNaN(parseInt(s));
};

const ValidInt = (num) => {
    return !Number.isNaN(parseInt(num));
};

const Empty = (ob) => {
    return Object.keys(ob).length === 0;
};

const Board = (string) => {
    return string[0] === 'b';
};

module.exports = { Priority, ValidString, ValidInt, Empty, Board };