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

function handleNumericKey(key) {
    if (inMiddleOfOperation) {
        screenText.innerHTML = key;
        inMiddleOfOperation = false;
    } else {
        screenText.innerHTML = screenText.innerHTML === '0' ? key : screenText.innerHTML + key;
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        handleNumericKey(key);
    } else if (key === '*' || key === '/' || key === '+' || key === '-') {
        handleOperatorKey(key);
    } else if (key === '=' || key === 'Enter') {
        handleEqualsKey();
    } else if (key === 'Backspace') {
        handleBackspaceKey();
    }
});

function handleOperatorKey(key) {
    if (!inMiddleOfOperation) {
        a = parseFloat(screenText.innerHTML);
        pendingOperation = key;
        runningText.innerHTML = screenText.innerHTML + " " + key + " ";
        inMiddleOfOperation = true;
    }
}

function handleEqualsKey() {
    if (pendingOperation !== null) {
        b = parseFloat(screenText.innerHTML);
        performPendingOperation();
        pendingOperation = null;
        inMiddleOfOperation = false;
        runningText.innerHTML = runningText.innerHTML.concat(b) + " =";
    }
}

function handleBackspaceKey() {
    screenText.innerHTML = screenText.innerHTML.slice(0, -1) || '0';
}

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
            b = parseFloat(screenText.innerHTML);
            performPendingOperation();
            pendingOperation = operator.innerHTML;
            runningText.innerHTML = screenText.innerHTML + " " + operator.innerHTML + " ";
            inMiddleOfOperation = true;
        } else {
            a = parseFloat(screenText.innerHTML);
            pendingOperation = operator.innerHTML;
            runningText.innerHTML = screenText.innerHTML + " " + operator.innerHTML + " ";
            inMiddleOfOperation = true;
        }
    });
});

CLEAR.addEventListener('click', () => {
    screenText.innerHTML = '0';
    runningText.innerHTML = '';
    inMiddleOfOperation = false;
    pendingOperation = null;
    CLEAR.blur();
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
        b = parseFloat(screenText.innerHTML);
        performPendingOperation();
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
        case '/':
            a = divide(a, b);
            break;
    }
    screenText.innerHTML = a;
}

function add(a, b){
    return a + b;
}
 
function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0) {
        alert("Cannot divide by zero!");
        return 0;
    }
    return a / b;
}