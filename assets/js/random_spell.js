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
    spell.innerHTML = `Your spell of the day is -  ${data[a].name}`;
    description.innerHTML = `What does it do? -  ${data[a].description}`;
  }
)
.catch ((error) => (console.log(error)));
    }

btn.addEventListener('click', randomSpell) ;