const process = require('process')

const CHAR_ESC = '\x1B'

const clearScreen = _ => process.stdout.write(CHAR_ESC + 'c')
    
module.exports = {
    clearScreen,
}
