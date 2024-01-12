const numberInput = Array.from(document.querySelectorAll('.num'));
let screenText = document.querySelector('.screenText');
const CLEAR = document.querySelector('.clear');
const DELETE = document.querySelector('.delete');
const DECIMAL = document.querySelector('.decimal');


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

CLEAR.addEventListener('click', () => {
    screenText.innerHTML = '0';
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