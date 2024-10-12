let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;
let fullMath = null;

//get DOM elements
const displayInput = document.getElementById("displayInput");
const displayFull = document.getElementById("displayFull");

//get all the number buttons and assign event handler
const numBtn = document.querySelectorAll(".num");
numBtn.forEach((button) => {
  button.addEventListener("click", () => handleNumInput(button.innerText));
});

//get basic operator buttons and assign event handler
const opBtn = document.querySelectorAll(".op");
opBtn.forEach((button) => {
  button.addEventListener("click", () => handleOperatorInput(button.innerText));
});

//get other buttons
const decbtn = document.getElementById("decbtn");
const clearAllBtn = document.getElementById("clearAll");
const percentbtn = document.getElementById("percentbtn");
const negbtn = document.getElementById("negativebtn");

//other event handlers
negbtn.addEventListener("click", handleNegInput);
decbtn.addEventListener("click", () => handleNumInput("."));
percentbtn.addEventListener("click", handlePercentInput);
clearAllBtn.addEventListener("click", clearAll);

function addNums(num1, num2) {
  //convert strings to numbers
  num1 = Number(num1);
  num2 = Number(num2);
  //do the operation
  result = num1 + num2;
  //reset number variables
  firstNum = null;
  secondNum = null;
  operator = null;
  return result;
}

function subtractNums(num1, num2) {
  //convert strings to numbers
  num1 = Number(num1);
  num2 = Number(num2);
  //do the operation
  result = num1 - num2;
  //reset number variables
  firstNum = null;
  secondNum = null;
  operator = null;
  return result;
}

function multiplyNums(num1, num2) {
  //convert strings to numbers
  num1 = Number(num1);
  num2 = Number(num2);
  console.log(typeof num1 + num1);
  console.log(typeof num2 + num2);
  //do the operation, X each by 10 then divide for floating point accuracy
  result = (num1 * 10 * (num2 * 10)) / 100;
  console.log("x" + result);
  //reset number variables
  firstNum = null;
  secondNum = null;
  operator = null;
  return result;
}

function divideNums(num1, num2) {
  //convert strings to numbers
  num1 = Number(num1);
  num2 = Number(num2);
  //do the operation
  result = num1 / num2;
  //reset number variables
  firstNum = null;
  secondNum = null;
  operator = null;
  return result;
}

function handleNumInput(num) {
  if (operator === null || operator === "=") {
    if (firstNum == null) {
      if (num === ".") {
        firstNum = "0."; //ad zero before decimal if "." is first input
      } else {
        firstNum = num;
      }
    } else if (firstNum !== null && result !== null) {
      //if previous result persists
      firstNum = num;
    } else if (firstNum !== null && result == null) {
      //f no previous result persists
      firstNum += num;
    }
    displayInput.innerHTML = firstNum;
    fullMath = firstNum;
    displayFull.innerHTML = fullMath;
    console.log("first number: " + firstNum);
    console.log("result: " + result);
  } else {
    //if user has selected an operator create second number
    if (secondNum == null) {
      secondNum = num;
      console.log("second num" + secondNum);
    } else if (secondNum !== null) {
      //append second number
      secondNum += num;
    }
    displayInput.innerHTML = secondNum;
    fullMath = fullMath.concat(num);
    displayFull.innerHTML = fullMath;
    console.log("second number: " + secondNum);
  }
}

function handleOperatorInput(op) {
  if (firstNum !== null && secondNum !== null) {
    if (op === "=") {
      if (operator == "+") {
        result = addNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        fullMath = fullMath.concat("=" + result);
        displayFull.innerHTML = fullMath;
        operator = null;
        console.log("result " + result);
        console.log(operator);
      } else if (operator == "-") {
        result = subtractNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        fullMath = fullMath.concat("=" + result);
        displayFull.innerHTML = fullMath;
        operator = null;
        console.log("result " + result);
      } else if (operator == "*") {
        result = multiplyNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        fullMath = fullMath.concat("=" + result);
        displayFull.innerHTML = fullMath;
        operator = null;
        console.log("result " + result);
      } else if (operator == "/") {
        result = divideNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        fullMath = fullMath.concat("=" + result);
        displayFull.innerHTML = fullMath;
        operator = null;
        console.log("result " + result);
      }
    }
  } else {
    operator = op;
    console.log("operator: " + operator);
    fullMath = fullMath.concat(op);
    displayFull.innerHTML = fullMath;
  }
}

//handles percent opertor
function handlePercentInput() {
  if (secondNum == null) {
    firstNum = parseInt(firstNum);
    firstNum = firstNum / 100;
    firstNum = firstNum.toString();
    console.log("percentage " + firstNum);
    displayInput.innerHTML = firstNum;
    console.log(typeof firstNum);
  } else {
    secondNum = parseInt(secondNum);
    secondNum = secondNum / 100;
    secondNum = secondNum.toString();
    console.log("percentage " + secondNum);
    displayInput.innerHTML = secondNum;
    console.log(typeof secondNum);
  }
}

//handle +/- operator
function handleNegInput() {
  if (firstNum === null) {
    firstNum = "-";
    displayInput.innerHTML = firstNum;
  } else if (secondNum == null) {
    firstNum = -firstNum;
    console.log(firstNum);
    displayInput.innerHTML = firstNum;
  } else {
    secondNum = -secondNum;
    console.log(secondNum);
    displayInput.innerHTML = secondNum;
  }
}

//clears the whole calculator
function clearAll() {
  firstNum = null;
  secondNum = null;
  operator = null;
  result = null;
  displayInput.innerText = " ";
  fullMath = null;
  displayFull.innerText = "";
  console.log("Clear All");
}
