function getSmallPokemonCard(currPokeData, currSpecieData, index) {
  return /*html*/`
    <div class="small-card-container" style="background-color: aqua;">
          <div class="small-card-head">
            <div class="pokemon-name">Kackvieh</div>
            <div class="pokemon-id">#<span id="pokemonID">69</span></div>
          </div>
          <div class="small-card-main">
            <div class="small-card-types">
              <!-- upper type box -->
              <div class="small-card-first-type">
                <div class="type-icon-box" style="background-color: rgb(146, 193, 42)">
                  <img class="type-icon" src="./assets/icons/bug.svg" alt="" />
                </div>

                <span class="type-description">Fire</span>
              </div>

              <!-- lower type box -->
              <div class="small-card-second-type">
                <div class="type-icon-box">
                  <img class="type-icon" src="./assets/img/pokeball.png" alt="" />
                </div>

                <span class="type-description">Kacka</span>
              </div>
            </div>

            <div class="small-card-img-box"><img class="small-card-img" src="./assets/img/pokeball.png" alt="" /></div>
          </div>
        </div>
  `
}