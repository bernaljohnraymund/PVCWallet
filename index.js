function generateIntCode (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

console.log(generateIntCode(1000000, 9999999))