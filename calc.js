let curOperation = "";
let argOne = '0';
let argTwo = '';
let started = false;
let calcStatus = "cleared";

function parseNumber(outcome) {
  return +outcome.toFixed(4);
}

function evaluate(curOperation) {
  if (curOperation === '+') {
    argOne = parseNumber(Number(argOne) + Number(argTwo));
  }
  else if (curOperation === 'x') {
    argOne = parseNumber(Number(argOne) * Number(argTwo));
  }
  else if (curOperation === '-') {
    argOne = parseNumber(Number(argOne) - Number(argTwo));
  }
  else if (curOperation === '/') {
    if (argTwo === "0") {
      clearCalculator();
      return "ERROR";
    }
    else {
      console.log(argTwo);
      argOne = parseNumber(Number(argOne) / Number(argTwo));
    }
  }
    argTwo = '';
    return argOne;
  }

function clearCalculator() {
  curOperation = "";
  argOne = '0';
  argTwo = '';
  displayText.textContent = '0';
  checkOperatorButtons("");
  calcStatus = "cleared";
}

function executeAction(button, displayText) {
  if (button.className === 'operator') {
    checkOperatorButtons(button.id);
    if (button.id === '=') {
      argOne = evaluate(curOperation);
      displayText.textContent = argOne;
      calcStatus = "pastResult";
      curOperation = '';
    }
    else {
      if (calcStatus = "pastResult") {
        if (argOne !== "" && argTwo !== "") {
          displayText.textContent = evaluate(curOperation);
          calcStatus = "pastResult";
        }
        curOperation = button.id;
        }
        else {
          curOperation = button.id;
          calcStatus = "pastResult";
        }
    }
  }
  else if (button.className === 'number') {
    if (calcStatus === "pastResult") {
      if (curOperation === '') {
        clearCalculator();
        argOne = button.id;
        displayText.textContent = argOne;
      }
      else {
        argTwo += button.id;
        displayText.textContent = argTwo;
      }
    }
    else {
      if (argOne === '0') {
        argOne = button.id;
      }
      else {
        argOne += button.id;
      }
      displayText.textContent = argOne;
    }
  }
  else if (button.className === 'clear') {
    clearCalculator();
  }
}

const calcContainer = document.body.querySelector('.calc-container');
const display = calcContainer.querySelector('.display');
const displayText = calcContainer.querySelector('.display-text');
displayText.textContent = "0";
const opContainer = calcContainer.querySelector('.operator-container');
const operatorRows = opContainer.querySelectorAll('.operator-row');
const operatorButtons = [];
operatorRows.forEach((row) => {
  const buttons = row.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener("click", ()=> executeAction(button, displayText));
    if (button.className === "operator" && button.id !== '=') {
      operatorButtons.push(button);
    } 
  });
})

function checkOperatorButtons(id) {
  operatorButtons.forEach((button) => {
    console.log(button.id);
    if (button.id === id) {
      button.style.backgroundColor = "rgb(40, 37, 228)";
    }
    else {
      button.style.backgroundColor = 'rgb(106, 166, 235)';
      button.style.border = 0;
    }
  });
}