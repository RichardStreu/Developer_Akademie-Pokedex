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
  document.getElementById("loadBtnContainer").classList.add("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("dialogLoadingSpinner").classList.add("d-none");
  document.getElementById("mainContentContainer").classList.remove("d-none");
  document.getElementById("loadBtnContainer").classList.remove("d-none");
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

async function initLoadData(start, end) {
  showLoadingSpinner();
  await loadKantoPokemons(start, end);
  // console.log(pokemonsDataArray);
  // console.log(pokemonSpeciesArray);
  initRenderSmallCards(start, end);
  hideLoadingSpinner();
  document.getElementById("header").classList.add("position-fixed");
}

async function loadShowMorePokemon() {
  document.getElementById("loadNextPokeBtn").setAttribute("disabled", "true");
  document.getElementById("loadNextPokeBtn").classList.remove("next-poke-btn-hover");
  document.getElementById("loadNextPokeBtn").classList.add("btn-style-while-loading-pokemon");
  document.getElementById("loadBtnText").classList.add("d-none");
  document.getElementById("loadBtnSpinnerBox").classList.remove("d-none");
  let start = currentPokemonsDataArray.length + 1;
  let end = start + 19;
  await loadKantoPokemons(start, end);
  showRenderMoreCards(start, end);
  document.getElementById("loadBtnText").classList.remove("d-none");
  document.getElementById("loadBtnSpinnerBox").classList.add("d-none");
  document.getElementById("loadNextPokeBtn").removeAttribute("disabled");
  document.getElementById("loadNextPokeBtn").classList.add("next-poke-btn-hover");
  document.getElementById("loadNextPokeBtn").classList.remove("btn-style-while-loading-pokemon");
}

// this function has to be assigned to the body as an onload listener when site is ready
initLoadData(1, 20);

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
  // currentPokemonsDataArray = pokemonsDataArray;
  // currentSpeciesDataArray = pokemonSpeciesArray;

  for (let index = start - 1; index < end; index++) {
    let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index);
    mainContentContainerRef.innerHTML += smallCard;
    // delay += 100;
  }
}

// RENDER BIG CARD #########################################################################
function getHabitat(index) {
  let habitat = "";
  if (pokemonSpeciesArray[index].habitat.name == "rare") {
    habitat = pokemonsDataArray[index].name;
  } else {
    habitat = pokemonSpeciesArray[index].habitat.name;
  }
  return habitat;
}

function renderAndShowBigCard(index) {
  const dialogBigCardRef = document.getElementById("dialogBigCard");
  dialogBigCardRef.innerHTML = "";
  let scrollY = window.scrollY;
  let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  let habitat = getHabitat(index);
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  let bigCard = getBigPokemonCard(pokemonsDataArray, pokemonSpeciesArray, index, scrollY, habitat);
  dialogBigCardRef.innerHTML = bigCard;
  dialogBigCardRef.classList.remove("d-none");
}

function closeAndHideBigCard() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.getElementById("dialogBigCard").classList.add("d-none");
}

// render big card content

let lastBigCardContent = "infos";

function renderBigCardContent(content, index) {
  if (content == "about") {
  }
}

function renderBigCardInfos(event, index) {
  event.stopPropagation();
  let bigCartLowerContentRef = document.getElementById("bigCartLowerContent");
  bigCartLowerContentRef.innerHTML = "";
  let infosContent = getBigCardInfosContent(index);
  bigCartLowerContentRef.innerHTML = infosContent;
  lastBigCardContent = "infos";
}

function renderBigCardAbout(event, index) {
  event.stopPropagation();
  let bigCartLowerContentRef = document.getElementById("bigCartLowerContent");
  bigCartLowerContentRef.innerHTML = "";
  let aboutContent = getBigCardAboutContent(index);
  bigCartLowerContentRef.innerHTML = aboutContent;
  lastBigCardContent = "about";
}

function renderBigCardStats(event, index) {
  event.stopPropagation();
  let bigCartLowerContentRef = document.getElementById("bigCartLowerContent");
  bigCartLowerContentRef.innerHTML = "";
  let statsContent = getBigCardStatsContent(index);
  bigCartLowerContentRef.innerHTML = statsContent;
  lastBigCardContent = "stats";
}

function renderBigCardHabitat(event, index) {
  event.stopPropagation();
  let bigCartLowerContentRef = document.getElementById("bigCartLowerContent");
  bigCartLowerContentRef.innerHTML = "";
  let habitat = getHabitat(index);
  let habitatContent = getBigCardHabitatContent(index, habitat);
  bigCartLowerContentRef.innerHTML = habitatContent;
  lastBigCardContent = "habitat";
}

// skip between big cards

function skipBigCardForwards(event, index) {
  event.stopPropagation();
  let nextIndex;
  if (index < pokemonsDataArray.length - 1) {
    nextIndex = index + 1;
    renderAndShowBigCard(nextIndex);
  } else {
    nextIndex = 0;
    renderAndShowBigCard(nextIndex);
  }
}

function skipBigCardBackwards(event, index) {
  event.stopPropagation();
  let lastIndex;
  if (index > 0) {
    lastIndex = index - 1;
    renderAndShowBigCard(lastIndex);
  } else {
    lastIndex = pokemonsDataArray.length - 1;
    renderAndShowBigCard(lastIndex);
  }
}

// function search pokemon
function searchAndShowPokemon() {
  let searchInput = document.getElementById("headerSearchField").value.toLowerCase();
  if (searchInput.length > 2) {
    document.getElementById("mainContentContainer").innerHTML = "";
    for (let index = 0; index < pokemonsDataArray.length; index++) {
      if (pokemonsDataArray[index].name.startsWith(searchInput)) {
        document.getElementById("mainContentContainer").innerHTML += renderSingleSmallCard(index);
      }
    }
  } else {
    let start = 1;
    let end = currentPokemonsDataArray.length - 1;
    initRenderSmallCards(start, end);
  }
}

function renderSingleSmallCard(index) {
  let smallCard = getSmallPokemonCard(currentPokemonsDataArray, currentSpeciesDataArray, index);
  return smallCard;
}
