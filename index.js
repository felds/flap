const screen = require('./lib/screen')

const config = {
    gravity: 0.01,
    fps: 20,
    stageWidth: 80,
    satageHeight: 20,
}

const initialState = {
    pos: 5,
    vel: 0,
    pipes: [],
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
    }
}

const show = (state) => {
    screen.clearScreen()
    
    for (let row = 0; row < config.satageHeight; row++) {
        console.log(row === Math.floor(state.pos) ? '#' : '-')
    }

    console.log(state)
}

const gameLoop = (state) => {
    show(state)
    setTimeout(
        _ => gameLoop(nextState(state, inputs)),
        1000/config.fps
    )
}

// Start
gameLoop(initialState)