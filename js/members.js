const boxForGryffindor = document.getElementById('membersBoxGryffindor');
const boxForHufflepuff = document.getElementById('membersBoxHufflepuff');
const boxForRavenclaw = document.getElementById('membersBoxRavenclaw');
const boxForSlytherin = document.getElementById('membersBoxSlytherin');
const gryffindorMembers = [];
const slytherinMembers = [];
const hufflepuffMembers = [];
const ravenclawMembers = [];
document.addEventListener('DOMContentLoaded', function(event) {
    getData();
});
const getData = () => {
    fetch('https://potterhead-api.vercel.app/api/characters')
    .then ((response) => (response.json()))
    .then ((response) => {
        response.forEach( (element) => {
            if (element.house === 'Slytherin') {
                slytherinMembers.push(element);
            }
            if (element.house === 'Gryffindor') {
                gryffindorMembers.push(element);
            }
            if (element.house === 'Hufflepuff') {
                hufflepuffMembers.push(element);
            }
            if (element.house === 'Ravenclaw') {
                ravenclawMembers.push(element);
            }})
            ravenclawMembers.forEach ((element) => ( addNew(element,boxForRavenclaw)));
            hufflepuffMembers.forEach ((element) => ( addNew(element,boxForHufflepuff)));
            gryffindorMembers.forEach ((element) => ( addNew(element,boxForGryffindor)));
            slytherinMembers.forEach ((element) => ( addNew(element,boxForSlytherin)));
    })
    .catch ((error) => (console.error(error)));
}

function addNew (response,box) {
    const memberPic = document.createElement('img');
    memberPic.src = response.image;
    const newMember = document.createElement('div');
    newMember.innerHTML = `<h2>${response.name}</h2> <div>${response.alternate_names}</div> <div>${response.patronus}</div>`;
    box.appendChild(memberPic);
    box.appendChild(newMember);
}
