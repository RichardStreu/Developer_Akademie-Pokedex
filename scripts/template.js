function getSmallPokemonCard(currPokeData, currSpecieData, index, delay) {
  return `
    <div 
      class="small-card-container" 
      style="background: ${typeData[currPokeData[index].types[0].type.name].backgroundColor}; opacity: 0; animation-delay: ${delay}ms"
      onclick="renderAndShowBigCard(${index})">
          <div class="small-card-head">
            <div class="pokemon-name">${currPokeData[index].name}</div>
            <div class="pokemon-id">#<span id="pokemonID">${currPokeData[index].id}</span></div>
          </div>
          <div class="small-card-main">
            <div class="small-card-types">
              <!-- upper type box -->
              <div class="small-card-first-type">
                <div class="type-icon-box" style="background-color: ${typeData[currPokeData[index].types[0].type.name].color}">
                  <img class="type-icon" src="${typeData[currPokeData[index].types[0].type.name].iconLink}" alt="" />
                </div>

                <span class="type-description">${currPokeData[index].types[0].type.name}</span>
              </div>

              <!-- lower type box -->
               ${
                 currPokeData[index].types.length > 1
                   ? `<div id="smallCardSecondType" class="small-card-second-type">
                <div class="type-icon-box" style="background-color: ${typeData[currPokeData[index].types[1].type.name].color}">
                  <img class="type-icon" src="${typeData[currPokeData[index].types[1].type.name].iconLink}" alt="" />
                </div>

                <span class="type-description">${currPokeData[index].types[1].type.name}</span>
              </div>`
                   : ""
               }
              
            </div>

            <div class="small-card-img-box"><img class="small-card-img" src="${currPokeData[index].sprites.other.home.front_default}" alt="" /></div>
          </div>
        </div>
  `;
}

function getBigPokemonCard(currPokeData, currSpecieData, index, scrollY) {
  return /*html*/ `
    <div class="big-poke-card-container" style="top: calc(${scrollY}px + 50vh)">
      <Div>This is a pokemon with the index ${index}</Div>
    </div>
  `;
}
