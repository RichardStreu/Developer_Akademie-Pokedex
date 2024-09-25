const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);

let kantoPokemons = [];

async function getPokemonsByEdition(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemon = await P.getPokemonByName(i);
    kantoPokemons.push(pokemon);
  }
}

async function loadData(start, end) {
  await getPokemonsByEdition(start, end);
  console.log(kantoPokemons);
}

loadData();
