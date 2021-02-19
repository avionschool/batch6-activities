console.log("Exercise 1 Activated");

//Height is in m and weight is in kg

const victor = {mass:70, height:1.7};
const john = {mass:65, height:1.6};

function bmiCalculator(person) {
    let bmi = person.mass / (person.height)**2;
    return bmi;
}

victor.bmi = bmiCalculator(victor);
john.bmi = bmiCalculator(john)

console.log(`Victor has a BMI of ${victor.bmi}`);
console.log(`John has a BMI of ${john.bmi}`);

let compare = function() {
    comparison = victor.bmi > john.bmi;
    console.log(`It is ${comparison} that Victor's BMI is higher that John's BMI`);
}

compare();