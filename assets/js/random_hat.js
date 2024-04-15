const hat = document.querySelector('.hatbox');
const container = document.querySelector('.container');
const houseBox = document.createElement('div');
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
    setInterval(function() {
        showOthers(houses);
    },1000)
}
function showRandom(randomHouse) {
    houseBox.innerText = 'Your house is: ';
    const chosenHouse = document.createElement('a');
    houseBox.appendChild(chosenHouse);
    chosenHouse.href = randomHouse.url;
    const imgChH = document.createElement('img');
    imgChH.src = randomHouse.img;
    chosenHouse.appendChild(imgChH);
}
function showOthers (houses) {
    const otherHouses = document.createElement('div');
    houseBox.appendChild(otherHouses);
    otherHouses.innerText = 'To see information about the other houses - click the house logo:';
    houses.forEach((house) => {
        const otherHouse = document.createElement('a');
        houseBox.appendChild(otherHouse);
        otherHouse.href = house.url;
        const imgOH = document.createElement('img');
        imgOH.src = house.img;
        otherHouse.appendChild(imgOH);
    })
}