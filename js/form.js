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
const houseData = form.elements.house;
const male = document.getElementById('m');
const female = document.getElementById('w');

form.addEventListener('submit', checkAllInputs);

formAgreement.addEventListener('change', () => {
    formButton.disabled = !formAgreement.checked;
    if (formAgreement.checked === true) {
        formButton.removeAttribute(disabled);
    }
});

for (let input of inputs) {
    input.addEventListener('focus', function () {
        input.style.border = '2px solid #fffaa9';
    });
    input.addEventListener('blur', function () {
        input.style.border = '';
    });
}
function checkValidity(input) {
    const validity = input.validity;
    if (validity.valueMissing) {
        createNewElement('This field is empty', 'div', input, 'error');
    }
    if (validity.patternMismatch) {
        createNewElement('Invalid data format', 'div', input, 'error');
    }
    if (validity.rangeOverflow) {
        const max = getAttributeValue(input, 'max');
        createNewElement(
            `The maximum value cannot be greater than ${max}`,
            'div',
            input,
            'error'
        );
    }
    if (validity.rangeUnderflow) {
        const min = getAttributeValue(input, 'min');
        createNewElement(
            `The minimum value cannot be less than ${min}`,
            'div',
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
        createNewElement(
            'Choose one',
            'div',
            document.getElementById('sex'),
            'error'
        );
    }
    if (houseData.value === '') {
        createNewElement('Choose one', 'div', houseData, 'error');
    }
    formAgreement.checked = false;
    formButton.disabled = !formAgreement.checked;
    console.log(document.querySelectorAll('.error').length);
    if (document.querySelectorAll('.error').length === 0) {
        createUserCard();
    }
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
    window.localStorage.setItem(mailData.value, JSON.stringify(newUser));
    const userLocalInfo = JSON.parse(
        window.localStorage.getItem(mailData.value)
    );
    console.log(userLocalInfo);
    const userCard = document.querySelector('.usercard');
    let imgUrl = './assets/images/img_main/';
    if (userLocalInfo.userHouse === 'Gryffindor') {
        imgUrl = imgUrl + 'gryffindor.png';
    }
    if (userLocalInfo.userHouse === 'Ravenclaw') {
        imgUrl = imgUrl + 'ravenclaw.png';
    }
    if (userLocalInfo.userHouse === 'Slytherin') {
        imgUrl = imgUrl + 'slytherin.png';
    }
    if (userLocalInfo.userHouse === 'Hufflepuff') {
        imgUrl = imgUrl + 'hufflepuff.png';
    }
    userCard.innerHTML = `<h2 class="usercard__title">User card</h2>
    <img  alt="House symbol" class="usercard__housesymbol" src="${imgUrl}"/>
    <div class="usercard__info ">
        <div class="usercard__label user__name">User name:</div>
    </div>
    <div class="usercard__info">
        <div class="usercard__label user__mail">e-mail:</div>
    </div>
    <div class="usercard__info">
        <div class="usercard__label user__age">Age:</div>
    </div>
    <div class="usercard__info">
        <div class="usercard__label user__sex">Sex:</div>
    </div>
    <div class="usercard__info">
        <div class="usercard__label user__house">House:</div>
    </div>
    <div class="usercard__info">
        <div class="usercard__label user__quote">Random quote for user:</div>
    </div>`;
    createNewElement(
        userLocalInfo.userName,
        'div',
        document.querySelector('.user__name'),
        'user-answer'
    );
    createNewElement(
        userLocalInfo.userMail,
        'div',
        document.querySelector('.user__mail'),
        'user-answer'
    );
    createNewElement(
        userLocalInfo.userAge,
        'div',
        document.querySelector('.user__age'),
        'user-answer'
    );
    createNewElement(
        userLocalInfo.userSex,
        'div',
        document.querySelector('.user__sex'),
        'user-answer'
    );
    createNewElement(
        userLocalInfo.userHouse,
        'div',
        document.querySelector('.user__house'),
        'user-answer'
    );
    createNewElement(
        `${userLocalInfo.quote} &#8212; ${userLocalInfo.speaker}`,
        'div',
        document.querySelector('.user__quote'),
        'user-answer'
    );
}
function createNewElement(content, tag, elem, classNew) {
    const newElem = document.createElement(tag);
    newElem.classList.add(classNew);
    newElem.innerHTML = content;
    elem.after(newElem);
}
