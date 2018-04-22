const screen = require('./lib/screen')

const config = {
    gravity: 0.1,
    fps: 5,
}
const initialState = {
    playerPosition: 5,
    playerVelocity: 0,
    pipes: [],
}
let inputs = []

const nextState = (state, inputs) => ({
    ...state,
    playerPosition: state.playerPosition - config.gravity,
})

const show = (state) => {
    screen.clearScreen()
    // @TODO render
    console.log(state)
}

const gameLoop = (state) => {
    show(state)
    setTimeout(
        _ => gameLoop(nextState(state, inputs)),
        1000/config.fps
    )
}

gameLoop(initialState)