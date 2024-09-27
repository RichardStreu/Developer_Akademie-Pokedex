const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);

// pokemons got from API when load the site first time. Then pokemons are saved in cache and will be got from there
let pokemonsDataArray = [];
let pokemonSpeciesArray = [];

let currentPokemonsDataArray = [];
let currentSpeciesDataArray = [];

// funtions to show and hide loading spinner

function showLoadingSpinner() {
  document.getElementById("dialogLoadingSpinner").classList.remove("d-none");
  document.getElementById("dialogBigCard").classList.add("d-none");
  document.getElementById("mainContentContainer").classList.add("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("dialogLoadingSpinner").classList.add("d-none");
  document.getElementById("dialogBigCard").classList.remove("d-none");
  document.getElementById("mainContentContainer").classList.remove("d-none");
}

// load a defined number of pokemons from API or Cache and push them to pokemonsDataArray #
async function loadPokemonsOnTheirID(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemon = await P.getPokemonByName(i);
    pokemonsDataArray.push(pokemon);
  }
}

async function loadPokemonSpeciesOnID(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemonSpecie = await P.getPokemonSpeciesByName(i);
    pokemonSpeciesArray.push(pokemonSpecie);
  }
}

async function loadKantoPokemons() {
  await loadPokemonsOnTheirID(1, 20);
  await loadPokemonSpeciesOnID(1, 20);
}

async function loadJohtoPokemon() {
  await loadPokemonsOnTheirID(1, 151);
}

async function loadData() {
  showLoadingSpinner();
  await loadKantoPokemons();
  // getTypes();
  console.log(pokemonsDataArray);
  // console.log(pokemonSpeciesArray);
  await renderSmallCards();
  hideLoadingSpinner();
}

// this function has to be assigned to the body as an onload listener when site is ready
loadData();

function renderSmallCards() {
  let mainContentContainerRef = document.getElementById("mainContentContainer");
  let delay = 0;
  mainContentContainerRef.innerHTML = "";
  currentPokemonsDataArray = pokemonsDataArray;
  currentSpeciesDataArray = pokemonSpeciesArray;

  for (let index = 0; index < currentPokemonsDataArray.length; index++) {
    let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index, delay);
    mainContentContainerRef.innerHTML += smallCard;
    delay += 65;
  }
}