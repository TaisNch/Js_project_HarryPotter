class User {
    constructor(
        userName,
        userMail,
        userAge,
        userSex,
        userHouse,
        quote,
        speaker
    ) {
        this.userName = userName;
        this.userMail = userMail;
        this.userAge = userAge;
        this.userSex = userSex;
        this.userHouse = userHouse;
        this.quote = quote;
        this.speaker = speaker;
    }
}

const form = document.forms.form;
const inputs = document.querySelectorAll('input');
const formAgreement = form.elements.userAgreement;
const formButton = form.elements.submitButton;

const nameData = form.elements.userName;
const mailData = form.elements.userEmail;
const ageData = form.elements.userAge;
const male = form.elements.radioOne;
const female = form.elements.radioTwo;
const houseData = form.elements.house;

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
        createNewElement('This field is empty', input, 'error');
    }
    if (validity.patternMismatch) {
        createNewElement('Invalid data format', input, 'error');
    }
    if (validity.rangeOverflow) {
        const max = getAttributeValue(input, 'max');
        createNewElement(
            `The maximum value cannot be greater than ${max}`,
            input,
            'error'
        );
    }
    if (validity.rangeUnderflow) {
        const min = getAttributeValue(input, 'min');
        createNewElement(
            `The minimum value cannot be less than ${min}`,
            input,
            'error'
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
    if (male.checked === false && female.checked === false) {
        createNewElement('Choose one', document.getElementById('sex'), 'error');
    }
    if (houseData.value === '') {
        createNewElement('Choose one', houseData, 'error');
    }
    formAgreement.checked = false;
    formButton.disabled = !formAgreement.checked;
    createUserCard();
}

function createNewElement(content, elem, classNew) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add(classNew);
    errorMessage.textContent = content;
    elem.after(errorMessage);
}

async function createUserCard() {
    const url = 'https://api.portkey.uk/quote';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('No connection to the server');
    }
    const data = await response.json();
    const randomQuote = data.quote;
    const randomSpeaker = data.speaker;
    let sex;
    if (male.checked) {
        sex = male.value;
    }
    if (female.checked) {
        sex = female.value;
    }
    let newUser = new User(
        nameData.value,
        mailData.value,
        ageData.value,
        sex,
        houseData.value,
        randomQuote,
        randomSpeaker
    );
    console.log(newUser);
    window.localStorage.setItem(mailData.value, newUser);
    const userLocalInfo = JSON.parse(
        window.localStorage.getItem(mailData.value)
    );
    const userCard = document.querySelector('.usercard');
    userCard.textContent = `<h2 class="usercard__title">User card</h2>
    <div class="usercard__box"></div>`;
    const userBox = document.querySelector('.usercard__box');
    createNewElement(userBox);
}

createUserCard();
