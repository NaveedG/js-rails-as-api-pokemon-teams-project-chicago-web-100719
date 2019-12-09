const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

main()

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    getTrainers()
  })
}

// get functions
function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => trainers.forEach(trainer => { 
    renderTeam(trainer)
    addPokemon(trainer)
  }))
}

function renderTeam(trainer) {
  const card = document.createElement('div')
  card.setAttribute('id', trainer.id)
  const main = document.querySelector('main')
  card.className = 'card'
  card.innerHTML = `<p>${trainer.name}</p><button data-trainer-id=${trainer.id}>Add Pokemon</button>`
  main.append(card)
  renderPokemons(trainer)
}

function renderPokemons(trainer) {
  const pokemonList = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => {
    const pokemonItem = document.createElement('li')
    pokemonItem.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-id=${pokemon.id}>Release</button>`
    pokemonList.appendChild(pokemonItem)
    releasePokemon(pokemon)
  })
  const card = document.getElementById(trainer.id)
  card.append(pokemonList)
}

// post functions
function addPokemon(trainer) {
  const card = document.getElementById(trainer.id)
  const addBtn = card.children[1]
  const pokemonList = card.children[2]
  addBtn.addEventListener('click', () => {
    const reqObj = postPokemon(trainer)
    fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(pokemon => {
      const pokemonItem = document.createElement('li')
      pokemonItem.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-id=${pokemon.id}>Release</button>`
      pokemonList.appendChild(pokemonItem)
    })
  })
}

function postPokemon(trainer) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({trainer_id: trainer.id})
  }
}

//delete function
function releasePokemon(pokemon) {
  const main = document.querySelector('main')
  main.addEventListener('click', (event) => {
    if (event.target.dataset.id === pokemon.id)
      fetch(`${POKEMONS_URL}/${pokemon.id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
      .then(resp => resp.json())
      event.target.parentElement.remove()
  })
}