const boxForGryffindor = document.getElementById('membersBoxGryffindor');
const boxForHufflepuff = document.getElementById('membersBoxHufflepuff');
const boxForRavenclaw = document.getElementById('membersBoxRavenclaw');
const boxForSlytherin = document.getElementById('membersBoxSlytherin');
document.addEventListener('DOMContentLoaded', function(event) {
    getData();
});
const getData = () => {
    fetch('https://potterhead-api.vercel.app/api/characters')
    .then ((response) => (response.json()))
    .then ((response) => {
        response.forEach( (element) => {
        addNew(element)})
    })
    .catch ((error) => (console.error(error)));
}

function addNew (response) {
    const memberPic = document.createElement('img');
    memberPic.src = response.image;
    const newMember = document.createElement('div');
    newMember.innerHTML = `<h2>${response.name}</h2> <div>${response.alternate_names}</div> <div>${response.patronus}</div>`;
        boxForGryffindor.appendChild(memberPic);
        boxForGryffindor.appendChild (newMember);
    // } else
    // if (response.house === 'Hufflepuff') {
    //     boxForHufflePuff.appendChild(memberPic);
    //     boxForHufflePuff.appendChild (newMember);
    // } else
    // if (response.house === 'Ravenclaw') {
    //     boxForRavenclaw.appendChild(memberPic);
    //     boxForRavenclaw.appendChild (newMember);
    // } else
    // if (response.house === 'Slytherin') {
    //     boxForSlytherin.appendChild(memberPic);
    //     boxForSlytherin.appendChild (newMember);
    } 

