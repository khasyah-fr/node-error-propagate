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

callbackFunction()

// 3. .then and .catch for Promises
function promiseFunction() {
    return new Promise((resolve, reject) => {
        // Simulate an async error
        const isError = true
        if (isError) {
            reject(new Error("Promise rejected"))
        } else {
            resolve("Promise resolved")
        }
    })
}

promiseFunction()
.then(result => console.log(result))
.catch(error => console.error("Caught promise error with .catch: ", error.message))

// 4. Try-catch for async/await code
async function asyncFunction() {
    try {
        const result = await promiseFunction()
        console.log(result)
    } catch (error) {
        console.error("Caught async/await error with try-catch: ", error.message)
    }
}

asyncFunction()
