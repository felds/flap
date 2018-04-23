const clamp = (min, max) => n => Math.max(min, Math.min(max, n))

module.exports = {
    clamp,
}