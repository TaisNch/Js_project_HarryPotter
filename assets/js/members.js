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
            gryffindorMembers.forEach ((element) => ( addNew(element,boxForGryffindor)));
            ravenclawMembers.forEach ((element) => ( addNew(element,boxForRavenclaw)));
            hufflepuffMembers.forEach ((element) => ( addNew(element,boxForHufflepuff)));
            slytherinMembers.forEach ((element) => ( addNew(element,boxForSlytherin)));
    })
    .catch ((error) => (console.error(error)));
}

function addNew (response,box) {
    console.log(response);
    const memberPic = document.createElement('img');
    memberPic.src = ((response.image === '') ? ('/assets/images/img_main/logo.png'): (response.image));
    const newMember = document.createElement('div');
    newMember.innerHTML = `<h2>${response.name}</h2>` + ((response.yearOfBirth === '') ? `Year of birth: No information available` : `<div>Year of birth: ${response.yearOfBirth}</div>`) + ((response.ancestry === '') ? `Ancestry: No information available` : `<div>Ancestry: ${response.ancestry}</div>`) + ((response.actor === '') ? `Actor: No information available` : `<div>Actor: ${response.actor}</div>`);
    box.appendChild(memberPic);
    box.appendChild(newMember);
}
