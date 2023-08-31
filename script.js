// script.js
const pokemonList = document.getElementById('pokemonList');
const pokemonDetails = document.getElementById('pokemonDetails');

const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=5'; // Change limit as needed
let offset = 0;

async function fetchPokemonList() {
  try {
    const response = await fetch(`${apiUrl}&offset=${offset}`);
    const data = await response.json();

    data.results.forEach(async pokemon => {
      const pokemonData = await fetchPokemonData(pokemon.url);
      createPokemonCard(pokemonData);
    });
  } catch (error) {
    console.error('Erro ao buscar a lista de Pokémon:', error);
  }
}

async function fetchPokemonData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error);
  }
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add(pokemon.types[0].type.name); // Adiciona a classe do tipo principal
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>#${pokemon.id}</p>
      <p>${pokemon.name}</p>
      <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    `;
  
    card.addEventListener('click', () => showPokemonDetails(pokemon));
  
    pokemonList.appendChild(card);
  }
  

function showPokemonDetails(pokemon) {
  pokemonDetails.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>ID: ${pokemon.id}</p>
    <p>Height: ${pokemon.height / 10} m</p>
    <p>Weight: ${pokemon.weight / 10} kg</p>
    <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    <button onclick="hidePokemonDetails()">Fechar</button>
  `;

  pokemonDetails.style.display = 'block';
}

function hidePokemonDetails() {
  pokemonDetails.style.display = 'none';
  pokemonDetails.innerHTML = '';
}

const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', fetchMorePokemon);

async function fetchMorePokemon() {
  offset += 5; // Incrementa o offset para carregar o próximo conjunto de Pokémon
  await fetchPokemonList();
}

fetchPokemonList();