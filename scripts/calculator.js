"use strict"

//    ****    Global Variables    ****
let displayValue = "0";


//    ****    Populate Fields   ****
const equation = document.querySelector("#equation-display");
const calculation = document.querySelector("#calculation-display");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const bracketOpen = document.querySelector("#bracket-open");
const bracketClose = document.querySelector("#bracket-close");
const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

const functions = document.querySelectorAll(".scientific");
const basic = document.querySelector("#basic");
const scientific = document.querySelector("#scientific");



//    ****    Event Listeners    ****
numbers.forEach(function(number){
  number.addEventListener("click", function(e) {
    inputNumber(e.target.innerText);
  });
});

operators.forEach(function(operator){
  operator.addEventListener("click", function(e) {
    inputOperator(e.target.innerText);
  });
});

bracketOpen.addEventListener("click", function(e) {
    inputBracketOpen(e.target.innerText);
});

bracketClose.addEventListener("click", function(e) {
    inputBracketClose(e.target.innerText);
});

decimal.addEventListener("click", function(e) {
  inputDecimal();
});

equals.addEventListener("click", operate);
 

//    ****    Functions    ****
function inputNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  }
  else {
    displayValue += number;
  }
 updateCalculationDisplay(); 
}


function inputOperator(operator) {
  if (/[\d\)]$/.test(displayValue)) {
    displayValue += " " + operator + " ";
  }
  else if (/\)\s$/.test(displayValue)) {
    displayValue += operator + " ";
  }
  else {
    return;
  }
 updateCalculationDisplay();
}


function inputBracketOpen(bracket) {
  if (displayValue === "0") {
    displayValue = bracket;
  }
  else if (/[\s\(]$/.test(displayValue)) {
    displayValue += bracket;
  }
updateCalculationDisplay();  
}



function inputBracketClose(bracket) {
  if (/[\d\)\()]$/.test(displayValue)) {
    displayValue += bracket;
  }
updateCalculationDisplay();  
}



function inputDecimal() {
  if (/\s$/.test(displayValue)|| /\($/.test(displayValue) ) {
    displayValue += "0.";
  }
  else if (/\.\d*$/.test(displayValue)) {
    return;
  } 
  else if (displayValue === "0" || /\d*$/.test(displayValue)) {
    displayValue += ".";
  }
 updateCalculationDisplay(); 
}


function updateEquationDisplay() {
  equation.textContent = displayValue;
  return;
}

function updateCalculationDisplay() {
  calculation.textContent = displayValue;
  return;
}

function operate() {
  console.log("operate");
  calculate();
}


function calculate() {
    console.log("calculate");
} 



//    ****    Commands    ****
updateEquationDisplay();
updateCalculationDisplay();



















/*


  btns.forEach(button => button.addEventListener("transitionend", removeTransition));
  btns2.forEach(button => button.addEventListener("transitionend", removeTransition));

  if (e.target.classList.contains("number")) {
    inputDigit(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("decimal")) {
    inputDecimal(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }
 
  if (e.target.classList.contains("operator")) {
    inputOperator(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    operate();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }
  
  if (e.target.classList.contains("brackets")) {
    inputBrackets(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    operate();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("clear")) {
    clearDisplay();
    updateDisplay();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("delete")) {
    if (/^\d$/.test(displayValue) || /^[\(\)]\s$/.test(displayValue) ||
    /^0[.]$/.test(displayValue) || /^0\s[\/\%\*\+\-]\s$/.test(displayValue) ||
    /^-$/.test(displayValue)) {
      clearDisplay();
      updateDisplay();
      e.target.classList.remove("hover-over");
      e.target.classList.add("selected");
    } else {
    deleteDisplay();
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
    }
  }








function operate() {
  let inputs = [];
  let outputQueue = []; 

  let tokens = displayValue.split(" ");
  tokens.splice(tokens.length - 1, 1);
 
  for (i = 0; i < tokens.length; i++ ) {
    let token = tokens[i];
    let o1 = inputs[inputs.length -1];

    if (isNumeric(token)) {
      outputQueue.push(token);
    } else if (/[\%\^\+\*\/\-]/.test(token)) {
    
      for (o1 = inputs[inputs.length -1];
          (/[\%\^\+\*\/\-]/.test(o1) && ((operators[token].precedence < operators[o1].precedence && operators[token].associativity == "right") ||
          (operators[token].precedence <= operators[o1].precedence && operators[token].associativity == "left")));
          o1 = inputs[inputs.length -1]) {
            outputQueue.push(o1);  
            inputs.pop();
      }
      inputs.push(token);
    } else if (token === "(") {
      inputs.push(token);
    } else if (token === ")") { 
      while (inputs.length > 0) {
        if (inputs[inputs.length - 1] != "(") {
        outputQueue.push(inputs.pop());
        } else if (inputs[inputs.length - 1] == "(") { 
          inputs.pop();
          break;

        } 
      }
    } else if (tokens[i] === "=") {
      while (inputs.length > 0) {
        outputQueue.push(inputs.pop());
      }
      let resultStack = [];
      for (let i = 0; i < outputQueue.length; i++) {
        if (isNumeric(outputQueue[i])) {
          resultStack.push(outputQueue[i]);
        }
        if (!isNumeric(outputQueue[i])) {
          let b = resultStack.pop();
          let a = resultStack.pop();
          if (/\+/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (outputQueue[i].search(/\-$/) == 0) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/[\*]/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\//.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\^/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\%/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
        }
      } 
    displayValue = Number(Math.round(resultStack[0] + "e2") + "e-2");
    if (resultStack[0] == Infinity || resultStack[0] == -Infinity) {
      displayValue = "Infinity! Can't divide by 0!";
    } 
    updateDisplay(); 
    } 
  }
}






















const operators = {
  "+": {
    name: "add",
    precedence: 1,
    associativity: "left",
    operation: function (a, b) {return a + b;},
  },
  "-": {
  name: "subtract",
  precedence: 1,
  associativity: "left",
  operation: function (a, b) {return a - b;},
  },
  "*": {
    name: "multiply",
    precedence: 2,
    associativity: "left",
    operation: function (a, b) {return a * b;},
  },
  "/": {
    name: "divide",
    precedence: 2,
    associativity: "left",
    operation: function (a, b) {return a / b;},
  },
  "^": {
    name: "exponent",
    precedence: 3,
    associativity: "right",
    operation: function (a, b) {return Math.pow(a, b);},
  },
  "%": {
    name: "mod",
    precedence: 3,
    associativity: "right",
    operation: function (a, b) {return a % b;},
  },
}



*/

