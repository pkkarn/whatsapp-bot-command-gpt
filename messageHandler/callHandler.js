// this is the place where you will define all your commands and related functions
const {
    gptExecute,
    taskExecute,
    addPoints,
    minusPoints
} = require('./executioner')

module.exports = {
    '#gpt': {
        execute: gptExecute
    },

    '#task': {
        execute: taskExecute
    },

    '#add_points': {
        execute: addPoints
    },

    '#remove_points': {
        execute: minusPoints
    }
}