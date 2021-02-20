alert("Welcome mga MAMEN");

const victorMass = 80;
const johnMass = 94;

const victorHeight = 1.69;
const johnHeight = 1.95;

const victorBMI = victorMass / (victorHeight * victorHeight);
const johnBMI = johnMass / (johnHeight * johnHeight);

const booleanVariable = victorBMI > johnBMI

console.log(victorBMI, johnBMI);
console.log(`Is Victor's BMI higher than John's? ${booleanVariable}`);
