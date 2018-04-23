const Pipe = (pos, height) => ({
    pos, height,
    move: n => Pipe(pos + n, height),
})

const Player = (pos, vel) => ({
    pos, vel,
})

module.exports = {
    Pipe,
    Player,
}