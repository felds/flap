#!/usr/bin/env node


const readline = require('readline')
const {gray} = require('./lib/colors')
const {clearScreen, createMatrix, printMatrix} = require('./lib/screen')
const {clamp} = require('./lib/math')
const {Pipe, Player} = require('./lib/entities')















process.exit()

const pipe = (...fs) => x => fs.length === 0 ? x : pipe(...fs.slice(1))(fs[0](x))



const config = {
    gravity: 0.025,
    flapForce: 0.6,
    fps: 30,
    stageWidth: 80,
    stageHeight: 20,
}

const initialState = {
    player: Player(2, 0),
    pipes: [],
    points: 0,
    failed: false,
}

let flap = false



const nextState = (state, inputs) => {
    const vel = clamp(-0.5, 0.5)(state.player.vel
        + config.gravity
        - (flap ? config.flapForce : 0)
    ) 
    const pos = state.player.pos += vel
    
    flap = false

    return {
        ...state,
        player: Player(pos, vel),
        points: state.points + 1,
        failed: pos > config.stageHeight,
    }
}

const withPlayer = player => m => {
    const p = Math.round(player.pos)

    if (p >= 0 && p < m.length) {
        m[p][player.padding] = '@'
    }
    
    return m
}
const withPipes = ps => m => m
const show = (state) => {
    clearScreen()
    
    const m = pipe(
        withPlayer(state.player),
    )(createMatrix('.', config.stageWidth, config.stageHeight))

    process.stdout.write(printMatrix(m))
    process.stdout.write('\n\n')

    console.log(`Meters: ${state.points}`)
}

const gameOver = (state) => {
    console.log(`You died after flying for ${state.points} meters.`)
    process.exit()
}

const gameLoop = (state) => {
    const currState = nextState(state)
    
    if (currState.failed) {
        gameOver(currState)
    } else {
        show(currState)
        
        setTimeout(_ => gameLoop(currState), 1000/config.fps)
    }
}


// Start
gameLoop(initialState)


//#region Input
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') process.exit()

        switch (key.name.toUpperCase()) {
            case 'UP': case 'SPACE': case 'W': flap = true
        }
    })
}
//#endregion