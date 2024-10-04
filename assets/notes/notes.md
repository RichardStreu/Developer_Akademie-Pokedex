Welche Typen gibt es:

- Grass -> Grün
- Fire -> Orange
- Water -> Blau
- Poison -> Lila
- Normal -> Grau
- Elektro -> Gelb
- Bug -> Hellgrün
- Stone -> Grau/beige
- Ghost -> Dunkellila
- Psycho -> Pink
- Steal -> Silber
- Fight -> Rotbraun
- Ice -> Aquamarine

- [x] funktion schreiben, mit der man das overlay wieder schließen kann
- [x] hinbekommen, das der hintergrund nihct mehr scrollbar ist, wenn eine große einzelkarte angezeigt wird.
- [x] implement a button to load more pokemon
  > - [x] am fußende positionieren
  > - [x] desigen
  > - [x] onclick funktion geben um render funktion auszuführen
  > - [x] currentPokemonData.length zum berechnen bzw als grundlegende anzahl zu nehmen, auf welche dann mehr geladen werden können
  > - [x] funktion so ergänzen, das der button während des ladens nicht nochmal gerück werden kann
- [x] loading spinner wird nicht mehr angezeigt!!! ---> Fix bug!
- [x] header positionieren.
- [x] input searchin field ddesign adding
- [x] code function to search the pokemon
- [x] ich brauche eine übersicht was alles auf der big card angezeigt werden soll!, dies muss jetzt ausgearbeitet werden

  > - [ ] Info: Hier kommen folgende Dinge rein

          - [x] Genera  pokemonSpeciesArray[index].genera[7].genus
          - [x] Type First
          - [x] Type Second
          - [x] Gewicht
          - [x] Größe
          - [x] Habitat

  > - [x] About: hier kommt ein Beschreibungstext rein, es wird mehrere sätze geben

          hier ist der hauptlink:
          pokemonSpeciesArray[0].flavor_text_entries[0].flavor_text = Satz 1
          pokemonSpeciesArray[0].flavor_text_entries[2].flavor_text = Satz 2
          pokemonSpeciesArray[0].flavor_text_entries[5].flavor_text = Satz 3
          pokemonSpeciesArray[0].flavor_text_entries[6].flavor_text = Satz 4

  > - [x] Stats: in TabellenForm oder als Netz

          HP [0]
          Attack [1]
          Defense [2]
          Special-Attack [3],
          Special-Defens [4]
          Speed [5]

          Pfad zum Attack Name: pokemonsDataArray["pokeIndex"].stats[2].stat.name = defense
          Pfad zur Attack Number: pokemonsDataArray[index].stats[2].base_stat = 49

- [x] skip funktion für große karten erstellen
- [x] skip funktion ergänzen, sodass man endlos skippen kann
- [x] stats bei big card anpassen, sodass jedes stat per funktion aufgerufen wird und immer der letzte stat stehen bleibt (globale variable anlegen wo letztes stat gespeichert wird, und dann ruft man das entsprechende aktuelle nach der letzten global geseicherten auf)
- [ ] hover effekt von smallCards überarbeiten
- [ ] padding von main content container erhöhen, sodass ein nach oben pfeil rechts platz hat
- [ ] nachObenPfeil rechts einbinden
- [ ] funktion für nach obenpfeil rechts schreiben - [ ] so das er sichtbar wird wenn ein stück gescrollt wurde - [ ] das wieder nach oben gescrollt wird beim klicken
- [x] funktion schreiben, sodass immer die stats angezeigt werden und beim karte skippen oder neue karte öffnen, immer der zuletzt gezeigte stat gezeigt wird
- [x] stats/info vom design fertig machen
- [ ] refactoring renderAndShowBigCard()
- [ ] responsive Ansicht!
