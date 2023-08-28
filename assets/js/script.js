// MAIN JS
const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 12
let offset = 0


function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
    <ol class="types">
    ${pokemon.types.map((type) => `<li class="type"> ${type} </li>`).join('')}
    </ol>

    <a href="./pokemon.html" target="_blank"> <img src="${pokemon.photo}" alt="${pokemon.name}"></a>
    
    
    </div>
    </li>`
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('') 
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})


function fetchPokemon() {
    const pokemonNumber = document.getElementById('pokemonNumber').value;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const pokemonInfo = document.getElementById('pokemonInfo');
        pokemonInfo.innerHTML = `
          <h2>${data.name.toUpperCase()}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p>Height: ${data.height / 10} m</p>
          <p>Weight: ${data.weight / 10} kg</p>
        `;
      })
      .catch(error => {
        console.error('Erro ao buscar o Pokémon:', error);
      });
  }



