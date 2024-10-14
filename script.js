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

function updateDisplay() {
  /*fullMath = `${firstNum || ""}${operator || ""}${secondNum || ""}${
    result !== null ? "=" + result : ""
  }`; */

  displayFull.innerHTML = fullMath;
  displayInput.innerHTML =
    result !== null
      ? result
      : secondNum !== null
      ? secondNum
      : firstNum !== null
      ? firstNum
      : "";
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      result = parseFloat(num1) + parseFloat(num2);
      return result;
    case "-":
      result = parseFloat(num1) - parseFloat(num2);
      return result;
    case "*":
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      //do the operation, X each by 10 then divide for floating point accuracy
      result = (num1 * 10 * (num2 * 10)) / 100;
      return result;
    case "/":
      console.log(num2);
      result = parseFloat(num1) / parseFloat(num2);
      return result;
  }
}

function handleNumInput(num) {
  if (operator === null || operator === "=") {
    //logic to add first number
    if (firstNum === null) {
      firstNum = num === "." ? "0." : num;
    } else if (result !== null) {
      //if previous result persists
      firstNum = result;
    } else if (firstNum !== null && result == null) {
      //check if num already has decimal
      if (num === "." && firstNum.includes(".")) return;
      //f no previous result persists
      firstNum += num;
    }
    fullMath = firstNum;
    updateDisplay();
    console.log("first number: " + firstNum);
    console.log("result: " + result);
  } else {
    //if user has selected an operator create second number
    if (secondNum == null) {
      secondNum = num;
    } else if (secondNum !== null) {
      //append second number
      secondNum += num;
    }
    //displayInput.innerHTML = secondNum;
    fullMath = `${firstNum || ""} ${operator || ""} ${secondNum || ""}`;
  }
  updateDisplay();
}

function handleOperatorInput(op) {
  if (firstNum !== null && secondNum !== null) {
    result = calculate(firstNum, secondNum, operator);
    fullMath = `${firstNum} ${operator || ""} ${secondNum} = ${result}`.trim();
    console.log(fullMath);
    firstNum = result;
    secondNum = null;
    if (op !== "=") {
      operator = op;
      fullMath = `${firstNum} ${operator}`.trim();
    } else {
      operator = null;
    }
  } else if (firstNum !== null) {
    operator = op;
    fullMath = `${firstNum} ${operator || ""}`.trim();
  }
  updateDisplay();
}

//handles percent opertor
function handlePercentInput() {
  if (secondNum == null) {
    firstNum = parseFloat(firstNum) / 100;
    firstNum = firstNum.toString();
    fullMath = firstNum;
  } else if (result == null) {
    secondNum = parseInt(secondNum);
    secondNum = secondNum / 100;
    secondNum = secondNum.toString();
    fullMath = `${firstNum || ""} ${operator || ""} ${secondNum || ""}`;
  } else if (result !== null) {
    secondNum = parseInt(secondNum);
    secondNum = secondNum / 100;
    secondNum = secondNum.toString();
  }
  updateDisplay();
}

//handle +/- operator
function handleNegInput() {
  if (firstNum === null) {
    firstNum = "-";
    fullMath = firstNum;
  } else if (secondNum === null) {
    firstNum = -firstNum;
    fullMath = firstNum;
    console.log(firstNum);
  } else {
    secondNum = -secondNum;
    fullMath = `${firstNum || ""} ${operator || ""} ${secondNum || ""}`;
    console.log(secondNum);
  }
  updateDisplay();
}

//clears the whole calculator
function clearAll() {
  firstNum = secondNum = operator = result = fullMath = null;
  fullMath = null;
  displayInput.innerText = "";
  updateDisplay();
}
