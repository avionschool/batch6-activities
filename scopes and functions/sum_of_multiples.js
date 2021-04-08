function sumOfMultiples(number, factors) {
    let sum = 0
    let newFactors = [...new Set(factors)]

    for (let i = 0; i < number; i++) {
        for (let j = 0; j < newFactors.length; j++) {
            if (i % newFactors[j] === 0) {
                sum += i
                break
            }
        }
    }return sum
}
module.exports = sumOfMultiples;