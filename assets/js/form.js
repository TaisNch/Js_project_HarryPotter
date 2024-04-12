const form = document.forms.form;
form.addEventListener('submit', checkAllInputs);

function checkValidity(input) {
    const validity = input.validity;
    if (validity.valueMissing) {
        createNewElement('This field is empty', 'error', input);
    }
    if (validity.patternMismatch) {
        createNewElement('Invalid data format', 'error', input);
    }
    if (validity.rangeOverflow) {
        const max = getAttributeValue(input, 'max');
        createNewElement(
            `The maximum value cannot be greater than ${max}`,
            'error',
            input
        );
    }
    if (validity.rangeUnderflow) {
        const min = getAttributeValue(input, 'min');
        createNewElement(
            `The minimum value cannot be less than ${min}`,
            'error',
            input
        );
    }
}

function checkAllInputs(e) {
    e.preventDefault();
    errors = [];
    let inputs = document.querySelectorAll('input');
    for (let input of inputs) {
        checkValidity(input);
    }
}

function createNewElement(content, classElem, elem) {
    const textBox = document.createElement('div');
    textBox.classList.add(classElem);
    textBox.textContent = content;
    elem.after(textBox);
}
