const process = require('process')

const CHAR_ESC = '\x1B'

const rep = n => x => Array(n).fill(x)

const clearScreen = _ => process.stdout.write(CHAR_ESC + 'c')

const createMatrix = (x, w, h) => rep(h)(rep(w)(x))

const printMatrix = m => m.map(row => row.join('')).join('\n')




module.exports = {
    clearScreen,
    createMatrix,
    printMatrix,
}