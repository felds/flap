#!/usr/bin/env node

const {gray, green} = require('./lib/colors')
const {clearScreen, createMatrix, printMatrix} = require('./lib/screen')
const {clamp} = require('./lib/math')
const {Pipe, Player} = require('./lib/entities')

const defined = x => typeof(x) !== 'undefined'

const head = xs => xs[0]
const tail = xs => xs.slice(1)
const join = glue => xs => xs.join(glue)
const fill = x => xs => xs.length
    ? [x, ...fill(x)(tail(xs))]
    : []
const map = f => xs => xs.length > 0
    ? [f(head(xs)), ...map(f)(tail(xs))]
    : []
const columns = length => xs => xs.length <= length
    ? [xs]
    : [xs.slice(0, length), ...columns(length)(xs.slice(length))]
const pipe = (...fs) => x => fs.length
    ? pipe(...tail(fs))(head(fs)(x))
    : x
const id = x => x
const every = f => xs => xs.reduce((acc, x) => acc && !!f(x), true)
const some = f => xs => xs.reduce((acc, x) => acc || !!f(x), false)
const all = every(id)
const any = some(id)    
const zip = (...xs) => every(defined)(map(head)(xs))
    ? [map(head)(xs), ...zip(...map(tail)(xs))]
    : []



const showMatrix = width => pipe(
    columns(width),
    map(join('')),
    join('\n'),
)



// const merge = (...xs) =>

// console.log(map(_ => 0)(new Array(3 * 4)))

// const asd = pipe(
//     fill('.'),
//     showMatrix(3),
// )(new Array(3 * 4))

// console.log(asd)
// console.log(columns(4)(matrix(3, 4)))
process.exit()





const bg = pipe(
    fill('x'),
    map(gray),
    m_set(3, 5, green("O")),
    chunks(80),
    map(join("")),
    join("\n"),
)(matrix(80, 30))




console.log(bg)
// process.stdout.write(bg)

// console.log(chunks(3)([1, 2, 3, 4, 5, 6, 7, 8]))
// console.log(Matrix(2, 4))
process.exit()



// const showMatrix = m => 















process.exit()




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