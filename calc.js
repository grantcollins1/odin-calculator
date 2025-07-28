let curOperation = "";
let argOne = '';
let argTwo = '';

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

function isArgOneSaved() {
  if (argOne !== '' && argOne != 'ERROR') {
    return true;
  }
  else {
    return false;
  }
}

function clearCalculator() {
  curOperation = "";
  argOne = '';
  argTwo = '';
  displayText.textContent = '0';
  checkOperatorButtons("");
}

function handleOperator(button, displayText) {
  if (button.id === '=') {
    argOne = evaluate(curOperation);
    displayText.textContent = argOne;
    curOperation = '';
  }
  else {
    console.log(isArgOneSaved());
    if (isArgOneSaved()) {
      if (argTwo !== "") {
        displayText.textContent = evaluate(curOperation);
      }
    }
      argOne = displayText.textContent;
      curOperation = button.id;
    }
  checkOperatorButtons(button.id);

}

function handleNumber(button, displayText) {
  if (isArgOneSaved()) {
    if (curOperation === '') {
      clearCalculator();
      displayText.textContent = button.id;
    }
    else {
      argTwo += button.id;
      displayText.textContent = argTwo;
    }
  }
  else {
    if (displayText.textContent === '0') {
      displayText.textContent = button.id;
    }
    else {
      displayText.textContent += button.id;
    }
  }
}

function handleDecimal(button, displayText) {
  if (isArgOneSaved()) {
    if (curOperation === '') {
      clearCalculator();
      displayText.textContent = '0.';
    }
    else {
      if (argTwo === '') {
        argTwo = '0.';
      }
      else if (!argTwo.includes('.')) {
        argTwo += button.id;
      }
      displayText.textContent = argTwo;
    }
  }
  else {
    if (!displayText.textContent.includes('.')) {
      displayText.textContent += button.id;
    }
  }
}

function executeAction(button, displayText) {
  if (displayText.textContent === "ERROR") {
    clearCalculator();
  }
  if (button.className === 'operator') {
    handleOperator(button, displayText);
  }
  else if (button.className === 'number') {
    handleNumber(button, displayText);
  }
  else if (button.className === 'clear') {
    clearCalculator();
  }
  else if (button.className === 'decimal') {
    handleDecimal(button, displayText);
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
    if (button.id === id) {
      button.style.backgroundColor = "rgb(40, 37, 228)";
    }
    else {
      button.style.backgroundColor = 'rgb(106, 166, 235)';
      button.style.border = 0;
    }
  });
}