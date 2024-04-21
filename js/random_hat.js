let animatedOne = new Typed('#hatText', {
    typeSpeed: 40,
    startDelay: 1000,
    stringsElement: '#animatedText',
    loop: true,
  });

const hat = document.querySelector('.hatbox');
const container = document.querySelector('.container');
const houseBox = document.createElement('div');
houseBox.classList.add('houseBox');
const hatText = document.getElementById('hatText');
container.append(houseBox);

hat.addEventListener('click',sortHouse);
const houses = [
    {
        name: 'Gryffindor',
        img: './assets/images/img_main/gryffindor.png',
        url: './Gryffindor.html',
    },
    {
        name: 'Hufflepuff',
        img: './assets/images/img_main/hufflepuff.png',
        url: './Hufflepuff.html',
    },
    {
        name: 'Ravenclaw',
        img: './assets/images/img_main/ravenclaw.png',
        url: './Ravenclaw.html',
    },
    {
        name: 'Slytherin',
        img: './assets/images/img_main/slytherin.png',
        url: './Slytherin.html',
    }
];
function sortHouse() {
    let randomIndex = Math.floor(Math.random() * houses.length);
    let randomHouse = houses[randomIndex]; 
    hat.style.display='none';
    houses.splice(randomIndex,1);
    showRandom(randomHouse);
    setTimeout(function() {
        showOthers(houses);
    },300)
    animatedOne = '';
    document.getElementById('hatText').style.display = 'none';
}

    
function showRandom(randomHouse) {
    houseBox.innerText = 'Your house is: ';
    const chosenHouse = document.createElement('a');
    houseBox.appendChild(chosenHouse);
    chosenHouse.href = randomHouse.url;
    chosenHouse.id = 'chosenH'; 
    const imgChH = document.createElement('img');
    imgChH.src = randomHouse.img;
    chosenHouse.appendChild(imgChH);
    const newTry = document.createElement('button');
    newTry.innerText = `Try again`;
    houseBox.append(newTry);
    newTry.id = 'tryButton';
    newTry.addEventListener('click',sortAgain);
}
function showOthers (houses) {
    const otherHouses = document.createElement('div');
    houseBox.appendChild(otherHouses);
    const oHText = document.createElement('div');
    oHText.innerText = 'To see information about the other houses - click the house logo:';
    houseBox.insertBefore(oHText,otherHouses);
    oHText.className = 'oHText';
    otherHouses.className = 'otherH'; 
    houses.forEach((house) => {
        const otherHouse = document.createElement('a');
        otherHouses.appendChild(otherHouse);
        otherHouse.href = house.url;
        const imgOH = document.createElement('img');
        imgOH.src = house.img;
        otherHouse.appendChild(imgOH);
    })
}
function sortAgain () {
    let fullHouses = [
        {
            name: 'Gryffindor',
            img: './assets/images/img_main/gryffindor.png',
            url: './Gryffindor.html',
        },
        {
            name: 'Hufflepuff',
            img: './assets/images/img_main/hufflepuff.png',
            url: './Hufflepuff.html',
        },
        {
            name: 'Ravenclaw',
            img: './assets/images/img_main/ravenclaw.png',
            url: './Ravenclaw.html',
        },
        {
            name: 'Slytherin',
            img: './assets/images/img_main/slytherin.png',
            url: './Slytherin.html',
        }
    ];
    let randomIndex = Math.floor(Math.random() * fullHouses.length);
    let randomHouse = fullHouses[randomIndex]; 
    hat.style.display='none';
    fullHouses.splice(randomIndex,1);
    showRandom(randomHouse);
    setTimeout(function() {
        showOthers(fullHouses);
    },300)
    animatedOne = '';
    document.getElementById('hatText').style.display = 'none';
}