
//mass in kg, height in 
var mVic = 61;
var hVic = 1.701;

var mJhn = 64;
var hJhn = 1.7526;

var mass;
var height;

var bmiVic = mVic/(hVic**2);
var bmiJhn = mJhn/(hJhn**2);

 console.log(bmiJhn);
 console.log(bmiVic);

console.log("Is Victor's BMI higher than John's? Answer:" + " " + Boolean(bmiVic > bmiJhn));