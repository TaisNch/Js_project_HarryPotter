const box = {
    boxForGryffindor: document.getElementById('membersBoxGryffindor'),
    boxForHufflepuff: document.getElementById('membersBoxHufflepuff'),
    boxForRavenclaw: document.getElementById('membersBoxRavenclaw'),
    boxForSlytherin: document.getElementById('membersBoxSlytherin'),}

const allMembers = {
 Gryffindor: [],
 Slytherin: [],
 Hufflepuff: [],
 Ravenclaw: [],
};
let decision = '';

document.addEventListener('DOMContentLoaded', function (event) {
 getData();
});

const getData = () => {
 return fetch('https://potterhead-api.vercel.app/api/characters')
  .then((response) => response.json())
  .then((response) => {
   response.forEach((element) => {
    if (element.house === 'Gryffindor') {
     allMembers.Gryffindor.push(element);
    } else if (element.house === 'Slytherin') {
     allMembers.Slytherin.push(element);
    } else if (element.house === 'Hufflepuff') {
     allMembers.Hufflepuff.push(element);
    } else if (element.house === 'Ravenclaw') {
     allMembers.Ravenclaw.push(element);
    }
   });
  })
  .catch((error) => console.error(error));
};

function addNew(response, box) {
    const member = document.createElement('div');
    member.className = 'member';
    const memberPic = document.createElement('img');
    memberPic.src = response.image === '' ? '/assets/images/img_main/card.png' : response.image;
    memberPic.className = 'member__img';
    const memberInfo = document.createElement('div');
    memberInfo.innerHTML =`
  <h2>${response.name}</h2>` +
  (response.yearOfBirth === null
   ? `<div>Year of birth: No information available</div>`
   : `<div>Year of birth: ${response.yearOfBirth}</div>`) +
  (response.ancestry === ''
   ? `<div>Ancestry: No information available</div>`
   : `<div>Ancestry: ${response.ancestry}</div>`) +
  (response.actor === ''
   ? `<div>Actor: No information available</div>`
   : `<div>Actor: ${response.actor}</div>`);
 box.appendChild(member);
 member.appendChild(memberPic);
 member.appendChild(memberInfo)
}


setTimeout(() => {
 allMembers.Gryffindor.forEach((element) => 
 addNew(element, box.boxForGryffindor));
}, 200);

setTimeout(() => {
 allMembers.Ravenclaw.forEach((element) => addNew(element, box.boxForRavenclaw));
}, 200);

setTimeout(() => {
 allMembers.Slytherin.forEach((element) => addNew(element, box.boxForSlytherin));
}, 200);

setTimeout(() => {
 allMembers.Hufflepuff.forEach((element) => addNew(element, box.boxForHufflepuff));
}, 200);



// const boxForGryffindor = document.getElementById('membersBoxGryffindor');
// const boxForHufflepuff = document.getElementById('membersBoxHufflepuff');
// const boxForRavenclaw = document.getElementById('membersBoxRavenclaw');
// const boxForSlytherin = document.getElementById('membersBoxSlytherin');
// const gryffindorMembers = [];
// const slytherinMembers = [];
// const hufflepuffMembers = [];
// const ravenclawMembers = [];
// document.addEventListener('DOMContentLoaded', function(event) {
//     getData();
// });
// const getData = () => {
//     fetch('https://potterhead-api.vercel.app/api/characters')
//     .then ((response) => (response.json()))
//     .then ((response) => {
//         response.forEach( (element) => {
//             if (element.house === 'Slytherin') {
//                 slytherinMembers.push(element);
//             }
//             if (element.house === 'Gryffindor') {
//                 gryffindorMembers.push(element);
//             }
//             if (element.house === 'Hufflepuff') {
//                 hufflepuffMembers.push(element);
//             }
//             if (element.house === 'Ravenclaw') {
//                 ravenclawMembers.push(element);
//             }})
//             ravenclawMembers.forEach ((element) => ( addNew(element,boxForRavenclaw)));
//             gryffindorMembers.forEach ((element) => ( addNew(element,boxForGryffindor)));
//             hufflepuffMembers.forEach ((element) => ( addNew(element,boxForHufflepuff)));
//             slytherinMembers.forEach ((element) => ( addNew(element,boxForSlytherin)));
//     })
//     .catch ((error) => (console.error(error)));
// }

// function addNew (response,box) {
//     console.log(response);
//     const memberPic = document.createElement('img');
//     memberPic.src = ((response.image === '') ? ('/assets/images/img_main/logo.png'): (response.image));
//     const newMember = document.createElement('div');
//     newMember.innerHTML = `<h2>${response.name}</h2>` + ((response.yearOfBirth === '') ? `Year of birth: No information available` : `<div>Year of birth: ${response.yearOfBirth}</div>`) + ((response.ancestry === '') ? `Ancestry: No information available` : `<div>Ancestry: ${response.ancestry}</div>`) + ((response.actor === '') ? `Actor: No information available` : `<div>Actor: ${response.actor}</div>`);
//     box.appendChild(memberPic);
//     box.appendChild(newMember);
// }

// document.addEventListener('DOMContentLoaded', function(event) {
//     loadData();
// });
// const boxForGryffindor = document.getElementById('membersBoxGryffindor');
// const boxForHufflepuff = document.getElementById('membersBoxHufflepuff');
// const boxForRavenclaw = document.getElementById('membersBoxRavenclaw');
// const boxForSlytherin = document.getElementById('membersBoxSlytherin');
// const gryffindorMembers = [];
// const slytherinMembers = [];
// const hufflepuffMembers = [];
// const ravenclawMembers = [];

// function loadData() { sortData();
//     ravenclawMembers.forEach ((element) => ( addNew(element,boxForRavenclaw)));
//     hufflepuffMembers.forEach ((element) => ( addNew(element,boxForHufflepuff)));
//     gryffindorMembers.forEach ((element) => ( addNew(element,boxForGryffindor)));
//     slytherinMembers.forEach ((element) => ( addNew(element,boxForSlytherin)));
// }

// const sortData = () => {
//     fetch('https://potterhead-api.vercel.app/api/characters')
//     .then ((response) => (response.json()))
//     .then ((response) => {
//         response.forEach( (element) => {
//             if (element.house === 'Slytherin') {
//                 slytherinMembers.push(element);
//             }
//             if (element.house === 'Gryffindor') {
//                 gryffindorMembers.push(element);
//             }
//             if (element.house === 'Hufflepuff') {
//                 hufflepuffMembers.push(element);
//             }
//             if (element.house === 'Ravenclaw') {
//                 ravenclawMembers.push(element);
//             }})
//     })
//     .catch ((error) => (console.error(error)));
// }

// function addNew (response,box) {
//     const memberPic = document.createElement('img');
//     memberPic.src = response.image;
//     const newMember = document.createElement('div');
//     newMember.innerHTML = `<h2>${response.name}</h2> <div>${response.alternate_names}</div> <div>${response.patronus}</div>`;
//     box.appendChild(memberPic);
//     box.appendChild(newMember);
// }
