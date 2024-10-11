let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;

//get DOM elements
const displayInput = document.getElementById("displayInput");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");
const btn0 = document.getElementById("btn0");
const decbtn = document.getElementById("decbtn");

const clearAllBtn = document.getElementById("clearAll");
const percentbtn = document.getElementById("percentbtn");
const plusbtn = document.getElementById("plusbtn");
const equalsbtn = document.getElementById("equalsbtn");
const minusbtn = document.getElementById("minusbtn");
const multbtn = document.getElementById("multbtn");
const divbtn = document.getElementById("divbtn");
const negbtn = document.getElementById("negativebtn");

//add event handlers
btn1.addEventListener("click", () => handleNumInput("1"));
btn2.addEventListener("click", () => handleNumInput("2"));
btn3.addEventListener("click", () => handleNumInput("3"));
btn4.addEventListener("click", () => handleNumInput("4"));
btn5.addEventListener("click", () => handleNumInput("5"));
btn6.addEventListener("click", () => handleNumInput("6"));
btn7.addEventListener("click", () => handleNumInput("7"));
btn8.addEventListener("click", () => handleNumInput("8"));
btn9.addEventListener("click", () => handleNumInput("9"));
btn0.addEventListener("click", () => handleNumInput("0"));
decbtn.addEventListener("click", () => handleNumInput("."));

//operator event handlers
plusbtn.addEventListener("click", () => handleOperatorInput("+"));
minusbtn.addEventListener("click", () => handleOperatorInput("-"));
multbtn.addEventListener("click", () => handleOperatorInput("*"));
divbtn.addEventListener("click", () => handleOperatorInput("/"));
equalsbtn.addEventListener("click", () => handleOperatorInput("="));
negbtn.addEventListener("click", () => handleNegInput());

//percent button
percentbtn.addEventListener("click", () => handlePercentInput());

clearAllBtn.addEventListener("click", () => clearAll());

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
  //do the operation
  result = num1 * num2;
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
        operator = null;
        console.log("result " + result);
        console.log(operator);
      } else if (operator == "-") {
        result = subtractNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        operator = null;
        console.log("result " + result);
      } else if (operator == "*") {
        result = multiplyNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        operator = null;
        console.log("result " + result);
      } else if (operator == "/") {
        result = divideNums(firstNum, secondNum);
        firstNum = result;
        displayInput.innerHTML = result;
        operator = null;
        console.log("result " + result);
      }
    }
  } else {
    operator = op;
    console.log("operator: " + operator);
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
  console.log("Clear All");
}
