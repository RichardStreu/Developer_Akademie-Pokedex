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
            <button class="big-card-info-button"
                    onclick="renderBigCardInfos(event, ${index})">
                    Infos
            </button>
            <button class="big-card-info-button"
                    onclick="renderBigCardAbout(event, ${index})">
                    About
            </button>
            <button class="big-card-info-button"
                    onclick="renderBigCardStats(event, ${index})">
                    Stats
            </button>
            <button class="big-card-info-button"
                    onclick="renderBigCardHabitat(event, ${index})">
                    Habitat
            </button>
          </div>
          <!-- lower part content -->
          <div id="bigCartLowerContent" class="big-cart-lower-content"></div>
        </div>
      </div>
    </div>
  `;
}

function getBigCardInfosContent(index) {
  return /*html*/ `
    <div class="big-card-infos-box">

    </div>
  `;
}

function getBigCardAboutContent(index) {
  return /*html*/ `
    <div class="big-card-about-box">
      <p>${pokemonSpeciesArray[index].flavor_text_entries[0].flavor_text.replace("\n", " ").replace("\f", " ")}</p>
      <br>
      <p>${pokemonSpeciesArray[index].flavor_text_entries[2].flavor_text.replace("\n", " ").replace("\f", " ")}</p>
      <br>
      <p>${pokemonSpeciesArray[index].flavor_text_entries[5].flavor_text.replace("\n", " ").replace("\f", " ")}</p>
      <br>
      <p>${pokemonSpeciesArray[index].flavor_text_entries[6].flavor_text.replace("\n", " ").replace("\f", " ")}</p>
    </div>
  `;
}

function getBigCardStatsContent(index) {
  return /*html*/ `
    <div class="big-card-stats-box">
      <table class="stats-table">
      <colgroup>
            <col>
            <col>
            <col>
        </colgroup>
        <tr class="stats-row">
          <td class="stats-description">HP</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[0].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[0].base_stat}%;"></div>
            </div>
          </td>
        </tr>
        <tr class="stats-row">
          <td class="stats-description">Attack</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[1].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[1].base_stat}%;"></div>
            </div>
          </td>
        </tr>
        <tr class="stats-row">
          <td class="stats-description">Defense</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[2].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[2].base_stat}%;"></div>
            </div>
          </td>
        </tr>
        <tr class="stats-row">
          <td class="stats-description">Sp. Atk</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[3].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[3].base_stat}%; background-color: ${
    typeData[currentPokemonsDataArray[index].types[0].type.name].color
  };"></div>
            </div>
          </td>
        </tr>
        <tr class="stats-row">
          <td class="stats-description">Sp. Def</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[4].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[4].base_stat}%; background-color: ${
    typeData[currentPokemonsDataArray[index].types[0].type.name].color
  };"></div>
            </div>
          </td>
        </tr>
        <tr class="stats-row">
          <td class="stats-description">Speed</td>
          <td class="stats-count">${pokemonsDataArray[index].stats[5].base_stat}</td>
          <td>
            <div class="stats-outer-bar">
              <div class="stats-inner-bar" style="width: ${pokemonsDataArray[index].stats[5].base_stat}%;"></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function getBigCardHabitatContent(index, habitat) {
  return /*html*/ `
    <div class="big-card-habitat-box">
      <p>The habitat of <span style="text-transform: capitalize">${pokemonsDataArray[index].name}</span> is</p>
      <div class="habitats-box-habitat">${habitats[habitat].habitatCall}</div>
      <img class="habitat-box-image" 
        src="${habitats[habitat].imgLink}" alt=""
        style="box-shadow: 0 0 8px ${typeData[currentPokemonsDataArray[index].types[0].type.name].color}">
    </div>
  `;
}
