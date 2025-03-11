// Node.js error handling scenarios

const fs = require('fs')
const { EventEmitter } = require('events')

// 1. Try-catch for synchronous code
function syncFunction() {
    try {
        // Will throw error as JSON is malformed
        JSON.parse("{ malformed json }")
    } catch (error) {
        console.error("Caught synchronous error: ", error.message)
    }
}

syncFunction()

// 2. Error handling for callbacks
function callbackFunction() {
    fs.readFile('non_existent_file.txt', (err, data) => {
        if (err) {
            // Manually check and handle for errors
            console.error("Error in callback: ", err.message)
        } else {
            console.log(data.toString())
        }
    })
}