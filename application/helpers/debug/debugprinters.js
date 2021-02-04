const colors = require('colors');

colors.setTheme({
    error: ['black', 'bgRed'],
    success: ['black', 'bgGreen'],
    request: ['black', 'bgWhite']
})

// Color-scheme will be better for the eyes, and faster to identify certain errors
    // Error is red
    // Success is green
    // Request is white

const printers = {
    errorPrint: (message) => {
        console.log(colors.error(message));
    },

    successPrint: (message) => {
        console.log(colors.success(message));
    },

    requestPrint: (message) => {
        console.log(colors.request(message));
    }
}

module.exports = printers;