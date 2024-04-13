const spell = document.getElementById('rndm__p' );
const description = document.getElementById('rndm__p1' );
const btn = document.getElementById('btn');

const randomSpell = ()=> {
  fetch ('https://potterhead-api.vercel.app/api/spells'
   )
  .then((resp) => resp.json())
  .then((data) => {
    const length = data.length;
    const a = Math.floor (Math.random()*length);
    spell.innerHTML = data[a].name;
    description.innerHTML = data[a].description}
)
.catch ((error) => (console.log(error)));
    }

btn.addEventListener('click', randomSpell) ;