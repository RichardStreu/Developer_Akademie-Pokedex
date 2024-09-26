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

// load a defined number of pokemons from API or Cache and push them to pokemonsDataArray
async function loadPokemonsOnTheirID(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemon = await P.getPokemonByName(i);
    pokemonsDataArray.push(pokemon);
  }
}

async function loadKantoPokemons() {
  await loadPokemonsOnTheirID(1, 151);
}

async function loadJohtoPokemon() {
  await loadPokemonsOnTheirID(1, 151);
}

async function loadData() {
  await loadKantoPokemons();
  console.log(pokemonsDataArray);
}

// this function has to be assigned to the body as an onload listener when site is ready
loadData();
