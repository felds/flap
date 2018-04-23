const Pipe = (pos, height) => ({
    pos, height,
    move: n => Pipe(pos + n, height),
})

const Player = (pos, vel) => ({
    pos, vel,
    padding: 20,
})

module.exports = {
    Pipe,
    Player,
}