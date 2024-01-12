const numberInput = Array.from(document.querySelectorAll('.num'));
let screenText = document.querySelector('.screenText');
let runningText = document.querySelector('.running');
const operators = Array.from(document.querySelectorAll('.op'));
const CLEAR = document.querySelector('.clear');
const DELETE = document.querySelector('.delete');
const DECIMAL = document.querySelector('.decimal');
const EQUALS = document.querySelector('.equal');

let result;
let a;
let b;
let inMiddleOfOperation = false;
let pendingOperation = null;


numberInput.forEach(btn => {
    btn.addEventListener("click", () => {
        const clickedNumber = btn.innerHTML;

        if (inMiddleOfOperation) {
            screenText.innerHTML = clickedNumber;
            inMiddleOfOperation = false;
        } else {
            if (screenText.innerHTML === '0') {
                screenText.innerHTML = clickedNumber;
            } else {
                screenText.innerHTML = screenText.innerHTML.concat(clickedNumber);
            }
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (pendingOperation !== null) {
            b = parseInt(screenText.innerHTML);
            performPendingOperation()
        } else {
            a = parseInt(screenText.innerHTML);
        }

        runningText.innerHTML = screenText.innerHTML + " " + operator.innerHTML + " ";
        inMiddleOfOperation = true;
        pendingOperation = operator.innerHTML;
    })
});

CLEAR.addEventListener('click', () => {
    screenText.innerHTML = '0';
    runningText.innerHTML = '';
    inMiddleOfOperation = false;
    pendingOperation = null;
});

DELETE.addEventListener('click', () => {
    let modifiedText = screenText.innerHTML.split('').slice(0, -1).join('');
    screenText.innerHTML = modifiedText;

    if (screenText.innerHTML.length === 0) {
        screenText.innerHTML = '0';
    }
});

DECIMAL.addEventListener('click', () => {
    if (!screenText.innerHTML.includes('.')){
        screenText.innerHTML = screenText.innerHTML.concat('.');
    }
});

EQUALS.addEventListener('click', () => {
    if (pendingOperation !== null) {
        b = parseInt(screenText.innerHTML);
        performPendingOperation()
        pendingOperation = null;
        inMiddleOfOperation = false;

        runningText.innerHTML = runningText.innerHTML.concat(b) + " =";
    }
});

function performPendingOperation() {
    switch (pendingOperation) {
        case '+':
            a = add(a, b);
            break;
        case '-':
            a = subtract(a, b);
            break;
        case '×':
            a = multiply(a, b);
            break;
        case '÷':
            a = divide(a, b);
            break;
    }
    screenText.innerHTML = result;
}

function add(a, b){
    return result = a + b;
 }
 
 function subtract(a, b){
     return result = a - b;
 }
 
 function multiply(a, b){
     return result = a * b;
 }
 
 function divide(a, b){
     return result = a / b;
 }