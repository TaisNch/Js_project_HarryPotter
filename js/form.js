const form = document.forms.form;
const inputs = document.querySelectorAll('input');
const formAgreement = form.elements.userAgreement;
const formButton = form.elements.submitButton;

form.addEventListener('submit', checkAllInputs);

formAgreement.addEventListener('change', () => {
    formButton.disabled = !formAgreement.checked;
    if (formAgreement.checked === true) {
        formButton.removeAttribute(disabled);
    }
});

for (let input of inputs) {
    input.addEventListener('focus', function () {
        input.style.border = '2px solid yellow';
    });
    input.addEventListener('blur', function () {
        input.style.border = '';
    });
}
function checkValidity(input) {
    const validity = input.validity;
    if (validity.valueMissing) {
        createNewErrorMessage('This field is empty', input);
    }
    if (validity.patternMismatch) {
        createNewErrorMessage('Invalid data format', input);
    }
    if (validity.rangeOverflow) {
        const max = getAttributeValue(input, 'max');
        createNewErrorMessage(
            `The maximum value cannot be greater than ${max}`,
            input
        );
    }
    if (validity.rangeUnderflow) {
        const min = getAttributeValue(input, 'min');
        createNewErrorMessage(
            `The minimum value cannot be less than ${min}`,
            input
        );
    }
}

function checkAllInputs(e) {
    e.preventDefault();
    if (document.querySelectorAll('.error')) {
        document.querySelectorAll('.error').forEach((error) => {
            error.remove();
        });
    }
    for (let input of inputs) {
        checkValidity(input);
    }
    if (
        form.elements.radioOne.checked === false &&
        form.elements.radioTwo.checked === false
    ) {
        createNewErrorMessage('Choose one', document.getElementById('sex'));
    }
    if (form.elements.house.value === '') {
        createNewErrorMessage('Choose one', form.elements.house);
    }
    formAgreement.checked = false;
    formButton.disabled = !formAgreement.checked;
}

function createNewErrorMessage(content, elem) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.textContent = content;
    elem.after(errorMessage);
}
