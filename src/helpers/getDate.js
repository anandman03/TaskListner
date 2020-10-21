#!/usr/bin/env node
'use strict';

const currDate = new Date();

const calculateDays = (date) => {
    const prev = new Date(date);
    const time = currDate - prev;
    return Math.floor(time/(1000*3600*24));
};

module.exports = { currDate, calculateDays };