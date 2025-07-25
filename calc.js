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
    argOne = parseNumber(argOne + argTwo);
  }
  else if (curOperation === 'x') {
    argOne = parseNumber(argOne * argTwo);
  }
  else if (curOperation === '-') {
    argOne = parseNumber(argOne - argTwo);
  }
  else if (curOperation === '/') {
    argOne = parseNumber(argOne / argTwo);
  }
    argTwo = '';
    return argOne;
  }

function executeAction(button, displayText) {
  if (button.className === 'operator') {
    if (button.id === '=') {
      argOne = evaluate(curOperation);
      displayText.textContent = argOne;
      curOperation = '';
    }
    else if (curOperation !== "") {
      if (argOne !== "" && argTwo !== "") {
        displayText.textContent = evaluate(curOperation) + button.id;
        curOperation = button.id;
      }
    }
    else {
      curOperation = button.id;
      started = true;
      displayText.textContent += button.id;
    }
  }
  else if (button.className === 'number') {
    if (started) {
      argTwo += button.id;
    }
    else {
      argOne += button.id;
    }
    displayText.textContent += button.id;
  }
}

function add(displayText) {

}



const calcContainer = document.body.querySelector('.calc-container');
const display = calcContainer.querySelector('.display');
const displayText = calcContainer.querySelector('.display-text');
const opContainer = calcContainer.querySelector('.operator-container');
const operatorRows = opContainer.querySelectorAll('.operator-row');
operatorRows.forEach((row) => {
  const buttons = row.querySelectorAll('button');
  buttons.forEach((button) => button.addEventListener("click", ()=> executeAction(button, displayText)));
})