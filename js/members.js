const box = {
    boxForGryffindor: document.getElementById('membersBoxGryffindor'),
    boxForHufflepuff: document.getElementById('membersBoxHufflepuff'),
    boxForRavenclaw: document.getElementById('membersBoxRavenclaw'),
    boxForSlytherin: document.getElementById('membersBoxSlytherin'),
};

const allMembers = {
    Gryffindor: [],
    Slytherin: [],
    Hufflepuff: [],
    Ravenclaw: [],
};

document.addEventListener('DOMContentLoaded', function (event) {
    getData();
});
async function getData() {
    const url = 'https://potterhead-api.vercel.app/api/characters';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('No connection to the server');
    }
    const data = await response.json();
    data.forEach(async (element) => {
        await makeArrays(element);
    });
    allMembers.Gryffindor.forEach(
        async (element) => await addNew(element, box.boxForGryffindor)
    );
    allMembers.Ravenclaw.forEach(
        async (element) => await addNew(element, box.boxForRavenclaw)
    );
    allMembers.Slytherin.forEach(
        async (element) => await addNew(element, box.boxForSlytherin)
    );
    allMembers.Hufflepuff.forEach(
        async (element) => await addNew(element, box.boxForHufflepuff)
    );
}
function makeArrays(element) {
    if (element.house === 'Gryffindor') {
        allMembers.Gryffindor.push(element);
    } else if (element.house === 'Slytherin') {
        allMembers.Slytherin.push(element);
    } else if (element.house === 'Hufflepuff') {
        allMembers.Hufflepuff.push(element);
    } else if (element.house === 'Ravenclaw') {
        allMembers.Ravenclaw.push(element);
    }
}

function addNew(response, box) {
    const member = document.createElement('div');
    member.className = 'member';
    const memberPic = document.createElement('img');
    memberPic.src =
        response.image === ''
            ? '/assets/images/img_main/card.png'
            : response.image;
    memberPic.className = 'member__img';
    const memberInfo = document.createElement('div');
    memberInfo.innerHTML =
        `
        <h2 class="member__name">${response.name}</h2>` +
        (response.yearOfBirth === null
            ? `<div class="member__text">Year of birth: No information available</div>`
            : `<div class="member__text">Year of birth: ${response.yearOfBirth}</div>`) +
        (response.ancestry === ''
            ? `<div class="member__text">Ancestry: No information available</div>`
            : `<div class="member__text">Ancestry: ${response.ancestry}</div>`) +
        (response.actor === ''
            ? `<div class="member__text">Actor: No information available</div>`
            : `<div class="member__text">Actor: ${response.actor}</div>`);
    box.appendChild(member);
    member.appendChild(memberPic);
    member.appendChild(memberInfo);
}
