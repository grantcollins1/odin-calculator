let curOperation = "";
let argOne = '';
let argTwo = '';
let started = false;

function parseNumber(outcome) {
  if (Number.isInteger(outcome)) {
    return String(outcome);
  }
  else {
    return outcome.toFixed(4);
  }
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
      argOne = "ERROR";
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
  argOne = '';
  argTwo = '';
  displayText.textContent = '';
  started = false;
  checkOperatorButtons("");
}

function executeAction(button, displayText) {
  if (button.className === 'operator') {
    checkOperatorButtons(button.id);
    if (button.id === '=') {
      argOne = evaluate(curOperation);
      displayText.textContent = argOne;
      curOperation = '';
    }
    else if (curOperation !== "") {
      if (argOne !== "" && argTwo !== "") {
        displayText.textContent = evaluate(curOperation);
      }
      curOperation = button.id;
    }
    else {
      curOperation = button.id;
      started = true;
    }
  }
  else if (button.className === 'number') {
    if (started) {
      if (curOperation === '') {
        clearCalculator();
        argOne += button.id;
        displayText.textContent += button.id;
      }
      else {
        argTwo += button.id;
        displayText.textContent = argTwo;
      }
    }
    else {
      argOne += button.id;
      displayText.textContent += button.id;
    }
  }
  else if (button.className === 'clear') {
    clearCalculator();
  }
}

const calcContainer = document.body.querySelector('.calc-container');
const display = calcContainer.querySelector('.display');
const displayText = calcContainer.querySelector('.display-text');
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