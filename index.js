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

// 5. Error listener for event emitters
const emitter = new EventEmitter()

emitter.on('error', (err) => {
    console.error("Caught event emitter error: ", err.message)
})

// Emit an error
emitter.emit('error', new Error("Something bad happened in EventEmitter"))

// 6. Unhandled Promise rejection
function unhandledPromise() {
    return Promise.reject(new Error('Unhandled promise rejection'))
}

unhandledPromise()

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at: ', promise, ' reason: ', reason.message)
})

// 7. Error listener for streams
const readableStream = fs.createReadStream('non_existent_file.txt')

readableStream.on('error', (error) => {
    console.error("Stream error caught: ", error.message)
})

// 8. Custom error propagation
class CustomError extends Error {
    constructor(message) {
        super(message)
        this.name = 'CustomError'
    }
}

function customErrorFunction() {
    throw new CustomError('This is a custom error')
}

try {
    customErrorFunction()
} catch (error) {
    console.error("Caught custom error: ", error.name, error.message)
}

// 9. Mixed error handling for synchronous and asynchronous
function mixedFunction() {
    try {
        // Sync error
        JSON.parse("{ malformed json }")

        // Async error
        promiseFunction().catch(err => {
            console.error("Caught async error inside try-catch: ", err.message)
        })
    } catch (error) {
        console.error("Caught mixed function error: ", error.message)
    }
}

mixedFunction()

// 10. Global error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception: ', error.message)
})

throw new Error("This is an uncaught exception")