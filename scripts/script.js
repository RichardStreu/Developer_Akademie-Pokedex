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
  document.getElementById("mainContentContainer").classList.add("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("dialogLoadingSpinner").classList.add("d-none");
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

async function loadKantoPokemons(start, end) {
  await loadPokemonsOnTheirID(start, end);
  await loadPokemonSpeciesOnID(start, end);
}

async function loadData(start, end) {
  showLoadingSpinner();
  await loadKantoPokemons(start, end);
  // console.log(pokemonsDataArray);
  // console.log(pokemonSpeciesArray);
  initRenderSmallCards(start, end);
  hideLoadingSpinner();
}

async function loadShowMorePokemon() {
  let start = currentPokemonsDataArray.length + 1;
  let end = start + 19;
  await loadKantoPokemons(start, end);
  showRenderMoreCards(start, end);
}

// this function has to be assigned to the body as an onload listener when site is ready
loadData(1, 20);

// RENDER SMALL CARDS ######################################################################
function initRenderSmallCards(start, end) {
  let mainContentContainerRef = document.getElementById("mainContentContainer");
  // let delay = 0;
  mainContentContainerRef.innerHTML = "";
  currentPokemonsDataArray = pokemonsDataArray;
  currentSpeciesDataArray = pokemonSpeciesArray;

  for (let index = start - 1; index < end; index++) {
    let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index);
    mainContentContainerRef.innerHTML += smallCard;
    // delay += 100;
  }
}

function showRenderMoreCards(start, end) {
  let mainContentContainerRef = document.getElementById("mainContentContainer");
  // let delay = 0;
  currentPokemonsDataArray = pokemonsDataArray;
  currentSpeciesDataArray = pokemonSpeciesArray;

  for (let index = start - 1; index < end; index++) {
    let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index);
    mainContentContainerRef.innerHTML += smallCard;
    // delay += 100;
  }
}

// RENDER BIG CARD #########################################################################
function renderAndShowBigCard(index) {
  const dialogBigCardRef = document.getElementById("dialogBigCard");
  dialogBigCardRef.innerHTML = "";
  let scrollY = window.scrollY;
  let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  let bigCard = getBigPokemonCard(pokemonsDataArray, pokemonSpeciesArray, index, scrollY);
  dialogBigCardRef.innerHTML = bigCard;
  dialogBigCardRef.classList.remove("d-none");
}

function closeAndHideBigCard() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.getElementById("dialogBigCard").classList.add("d-none");
}
