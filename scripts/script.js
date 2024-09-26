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
  await loadPokemonsOnTheirID(1, 151);
  await loadPokemonSpeciesOnID(1, 151);
}

async function loadJohtoPokemon() {
  await loadPokemonsOnTheirID(1, 151);
}

async function loadData() {
  await loadKantoPokemons();
  // getTypes();
  // console.log(pokemonsDataArray);
  // console.log(pokemonSpeciesArray);
  renderSmallCards();
}

// this function has to be assigned to the body as an onload listener when site is ready
loadData();

let types = [];

// function getTypes() {
//   for (let i = 0; i < pokemonsDataArray.length; i++) {
//     let type = pokemonsDataArray[i].types[0].type.name;
//     if (!types.includes(type)){
//       types.push(type);
//     }
//   }
//   console.log(types);
// }

function renderSmallCards() {
  let mainContentContainerRef = document.getElementById("mainContentContainer");
  mainContentContainerRef.innerHTML = "";
  currentPokemonsDataArray = pokemonsDataArray;
  currentSpeciesDataArray = pokemonSpeciesArray;

  for (let index = 0; index < currentPokemonsDataArray.length; index++) {
    let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index);
    mainContentContainerRef.innerHTML += smallCard;
  }
}
