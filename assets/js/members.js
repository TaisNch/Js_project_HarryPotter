const boxForGryffindor = document.getElementById('membersBoxGryffindor');
document.addEventListener('DOMContentLoaded', function(event) {
    getData();
});
const getData = () => {
    fetch('https://potterhead-api.vercel.app/api/characters')
    .then ((response) => (response.json()))
    .then ((response) => {
        response.forEach( (element) => addNew(element))
    })
    .catch ((error) => (console.error(error)));
}

function addNew (response) {
    const memberPic = document.createElement('img');
    memberPic.src = response.image;
    boxForGryffindor.appendChild(memberPic);
    const newMember = document.createElement('div');
    newMember.innerHTML = `<h2>${response.name}</h2> <div>${response.alternate_names}</div> <div>${response.patronus}</div>`;
    boxForGryffindor.appendChild (newMember);
}
