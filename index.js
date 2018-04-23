const screen = require('./lib/screen')

const config = {
    gravity: 0.01,
    fps: 20,
    stageWidth: 80,
    stageHeight: 20,
}

const initialState = {
    pos: 5,
    vel: 0,
    pipes: [],
    points: 0,
    failed: false,
}

let inputs = []

const nextState = (state, inputs) => {
    // @TODO check fail states

    const vel = state.vel += config.gravity
    const pos = state.pos += vel

    return {
        ...state,
        vel,
        pos,
        points: state.points + 1,
        failed: pos > config.stageHeight,
    }
}

const show = (state) => {
    screen.clearScreen()
    
    for (let row = 0; row < config.stageHeight; row++) {
        console.log(row === Math.floor(state.pos) ? '🍆' : ' ')
    }

    console.log(`points: ${state.points}`)
}

const gameOver = (state) => {
    console.log(`You died after flying for ${state.points} meters.`)
    process.exit()
}

const gameLoop = (state) => {
    const currState = nextState(state, inputs)
    
    if (currState.failed) {
        gameOver(currState)
    } else {
        show(currState)
        setTimeout(
            _ => gameLoop(currState),
            1000/config.fps
        )
    }
}

// Start
gameLoop(initialState)