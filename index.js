const readline = require('readline')
const screen = require('./lib/screen')
const {Pipe, Player} = require('./lib/entities')

const clamp = (min, max) => n => Math.max(min, Math.min(max, n))

const config = {
    gravity: 0.025,
    flapForce: 0.6,
    fps: 30,
    stageWidth: 80,
    stageHeight: 20,
}

const initialState = {
    player: Player(5, 0),
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

const show = (state) => {
    screen.clearScreen()
    
    for (let row = 0; row < config.stageHeight; row++) {
        console.log(row === Math.floor(state.player.pos) ? '🍆' : '☁️')
    }

    console.log(`points: ${state.points}`)
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