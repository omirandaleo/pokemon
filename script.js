const pokemonNome = document.querySelector('.Pokemon_nome');
const pokemonNumero = document.querySelector('.Pokemon_numero');
const pokemonImage = document.querySelector('.Pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const Next = document.querySelector('.btn-next');
const Prev = document.querySelector('.btn-prev');

let procurarPokemon = 1;

document.addEventListener('DOMContentLoaded', () => renderPokemon(procurarPokemon));

const fetchPokemon = async (pokemon) =>{
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}
 
const renderPokemon = async (pokemon) => {
  pokemonNome.innerHTML = 'Carregando ...';
  pokemonNumero.innerHTML = '';
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = '';
    procurarPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonNome.innerHTML = 'Não encontrado';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

Prev.addEventListener('click', () => {
  if (procurarPokemon > 1) {
    procurarPokemon -= 1;
    renderPokemon(procurarPokemon);
  }
})

Next.addEventListener('click', () => {
  procurarPokemon += 1;
  renderPokemon(procurarPokemon);
});

renderPokemon('procurarPokemon')
