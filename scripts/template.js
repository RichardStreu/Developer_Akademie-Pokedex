function getSmallPokemonCard(currPokeData, currSpecieData, index, delay) {
  return `
    <div 
      class="small-card-container" 
      style="background: ${typeData[currPokeData[index].types[0].type.name].backgroundColor}; opacity: 1; animation-delay: ${delay}ms"
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

function getBigPokemonCard(currPokeData, currSpecieData, index, scrollY, habitat) {
  return /*html*/ `
    <div class="big-poke-card-container" style="top: calc(${scrollY}px + 50vh); background: ${
    typeData[currPokeData[index].types[0].type.name].backgroundColorBigCard
  }; box-shadow: 2px 4px 16px ${typeData[currPokeData[index].types[0].type.name].color};">
      <!-- upper part -->
      <div class="big-card-upper-part">
        <div class="big-card-header">
          <div onclick="skipBigCardBackwards(event, ${index})" id="bigCardSkipBackwards" class="big-card-skip-backwards"><</div>
          <div class="big-card-name-box"><span>${currPokeData[index].name}</span>#${index + 1}</div>
          <div onclick="skipBigCardForwards(event, ${index})" id="bigCardSkipForwards" class="big-card-skip-forwards">></div>
        </div>
        <img class="big-card-image" src="${currPokeData[index].sprites.other.home.front_default}" alt="">
      </div>
      <!-- lower Part -->
      <div class="big-card-lower-image" style="background-image: url(${habitats[habitat].imgLink});">
        <div class="big-card-lower-part">
          <div class="navba-lower-part">
            <button class="big-card-info-button">Infos</button>
            <button class="big-card-info-button">About</button>
            <button class="big-card-info-button">Stats</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
