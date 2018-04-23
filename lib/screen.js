const process = require('process')

const CHAR_ESC = '\x1B'

const clearScreen = _ => process.stdout.write(CHAR_ESC + 'c')

const createMatrix = (x, w, h) => {
    const m = []
    
    for (let row = 0; row < h; row++) {
        m[row] = []
        for (let col = 0; col < w; col++) {
            m[row][col] = x
        }
    }

    return m
}

const printMatrix = m => m.map(row => row.join('')).join('\n')




module.exports = {
    clearScreen,
    createMatrix,
    printMatrix,
}