class User {
    constructor(
        userName,
        userMail,
        userAge,
        userSex,
        userHouse,
        quote,
        speaker,
        imgUrl
    ) {
        this.userName = userName;
        this.userMail = userMail;
        this.userAge = userAge;
        this.userSex = userSex;
        this.userHouse = userHouse;
        this.quote = quote;
        this.speaker = speaker;
        this.imgUrl = imgUrl;
    }
}
const users = [];
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
const findFriendForm = document.forms.findfriendForm;
const findFriendSelect = findFriendForm.elements.findHouse;
const findFriendButton = findFriendForm.elements.findFormButton;
const findFriendResult = document.querySelector('.findfriend__result');

form.addEventListener('submit', checkAllInputs);
document.forms.findfriendForm.addEventListener('submit', findFriendsForUser);

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
    let imgUrl = './assets/images/img_main/';
    if (houseData.value === 'Gryffindor') {
        imgUrl = imgUrl + 'gryffindor.png';
    }
    if (houseData.value === 'Ravenclaw') {
        imgUrl = imgUrl + 'ravenclaw.png';
    }
    if (houseData.value === 'Slytherin') {
        imgUrl = imgUrl + 'slytherin.png';
    }
    if (houseData.value === 'Hufflepuff') {
        imgUrl = imgUrl + 'hufflepuff.png';
    }
    console.log(imgUrl);
    let newUser = new User(
        nameData.value,
        mailData.value,
        ageData.value,
        sex,
        houseData.value,
        randomQuote,
        randomSpeaker,
        imgUrl
    );
    window.localStorage.setItem(mailData.value, JSON.stringify(newUser));
    const userLocalInfo = JSON.parse(
        window.localStorage.getItem(mailData.value)
    );
    console.log(userLocalInfo);
    const userCard = document.querySelector('.usercard');
    userCard.innerHTML = `<h2 class="usercard__title">User card</h2>
    <img  alt="House symbol" class="usercard__housesymbol" src="${userLocalInfo.imgUrl}"/>
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
    // inputs.forEach((input) => {
    //     input.value = '';
    // });
}

function findFriendsForUser(e) {
    e.preventDefault();
    findFriendResult.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        users.push(localStorage.key(i));
    }
    while (randoms.length < users.length) {
        let randomIndex = Math.floor(Math.random() * users.length);
        randoms.push(randomIndex);
        randoms = [...new Set(randoms)];
    }
    console.log(users.length);
    const friendRandoms = [];
    const friendGryffindors = [];
    const friendRavenclaws = [];
    const friendSlytherins = [];
    const friendHufflepuffs = [];
    if (findFriendSelect.value === '') {
        for (let i = 0; i < 4; i++) {
            let userInfo = JSON.parse(
                window.localStorage.getItem(users[randoms[i]])
            );
            friendRandoms.push(userInfo);
        }
        if (users.length < 4) {
            friendRandoms.push('');
        }
        // while (friendRandoms.length < 4) {
        //     let randomIndex = Math.floor(Math.random() * users.length);
        //     let userInfo = JSON.parse(
        //         window.localStorage.getItem(users[randomIndex])
        //     );
        //     friendRandoms.push(userInfo);
        //     if (users.length < 4) {
        //         friendRandoms.push('');
        //     }
        // }
        randoms = [];
        createMemberCard(friendRandoms);
    }
    findHouseMembers('Gryffindor', friendGryffindors, randoms);
    findHouseMembers('Ravenclaw', friendRavenclaws, randoms);
    findHouseMembers('Slytherin', friendSlytherins, randoms);
    findHouseMembers('Hufflepuff', friendHufflepuffs, randoms);
    findFriendSelect.value === '';
}
function findHouseMembers(house, members, randoms) {
    console.log(randoms);
    if (findFriendSelect.value === house) {
        randoms.forEach((random) => {
            let userInfo = JSON.parse(
                window.localStorage.getItem(users[random])
            );
            if (userInfo.userHouse === house) {
                members.push(userInfo);
            }
            if (members.length > 4) {
                return;
            }
        });
        randoms = [];
        // let count = 0;
        // users.forEach((user) => {
        //     if (user.userHouse === house) {
        //         count++;
        //     }
        // });
        // while (members.length < 4) {
        //     // let randomIndex = Math.floor(Math.random() * users.length);
        //     let userInfo = JSON.parse(
        //         window.localStorage.getItem(users[randomIndex])
        //     );
        //     if (userInfo.userHouse === house) {
        //         members.push(userInfo);
        //     }

        //     if (count < 4) {
        //         members.push('');
        //     }
        // }

        createMemberCard(members);
    }
}
function createMemberCard(members) {
    members.forEach((element) => {
        if (element !== '') {
            const memberCard = `
        <img  alt="House symbol" class="findfriend__housesymbol" src="${element.imgUrl}"/>
        <div class="findfriend__username">Name: ${element.userName}</div>
        <div class="finduser__house">House: ${element.userHouse}</div>
        <div class="user__mail">e-mail:${element.userMail}</div>`;
            const member = document.createElement('div');
            member.classList.add('finduser__member');
            member.innerHTML = memberCard;
            findFriendResult.append(member);
        }
    });
}
function createNewElement(content, tag, elem, classNew) {
    const newElem = document.createElement(tag);
    newElem.classList.add(classNew);
    newElem.innerHTML = content;
    elem.after(newElem);
}
