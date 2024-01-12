const numberInput = Array.from(document.querySelectorAll('.num'));
let screenText = document.querySelector('.screenText');
let runningText = document.querySelector('.running');
const operators = Array.from(document.querySelectorAll('.op'));
const CLEAR = document.querySelector('.clear');
const DELETE = document.querySelector('.delete');
const DECIMAL = document.querySelector('.decimal');

let result;


numberInput.forEach(btn => {
    btn.addEventListener("click", () => {
        const clickedNumber = btn.innerHTML;

        if (screenText.innerHTML === '0') {
            screenText.innerHTML = clickedNumber;
        }
        else {
            screenText.innerHTML = screenText.innerHTML.concat(clickedNumber);
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        runningText.innerHTML = screenText.innerHTML + " " + operator.innerHTML;
    })
});

CLEAR.addEventListener('click', () => {
    screenText.innerHTML = '0';
    runningText.innerHTML = '';
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

// upon click of any of the operators need to send the screentexthtml to a new p above it with the operator next to it, and store the initial value of the innerhtml in var a, then on next click of number have that override the innerhtml, then store second number in var b.