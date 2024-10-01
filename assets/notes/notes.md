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
- [ ] ich brauche eine übersicht was alles auf der big card angezeigt werden soll!, dies muss jetzt ausgearbeitet werden

  > - [ ] Info: Hier kommen folgende Dinge rein

          - [ ] Type First
          - [ ] Type Second
          - [ ] Gewicht
          - [ ] Größe
          - [ ] Habitat

  > - [ ] About: hier kommt ein Beschreibungstext rein, es wird mehrere sätze geben

          hier ist der hauptlink:
          pokemonSpeciesArray[0].flavor_text_entries[0].flavor_text = Satz 1
          pokemonSpeciesArray[0].flavor_text_entries[2].flavor_text = Satz 2
          pokemonSpeciesArray[0].flavor_text_entries[5].flavor_text = Satz 3
          pokemonSpeciesArray[0].flavor_text_entries[6].flavor_text = Satz 4

  > - [ ] Stats: in TabellenForm oder als Netz

          HP [0], Attack [1], Defense [2], Special-Attack [3], Special-Defens [4], Speed [5]
          Pfad zum Attack Name: pokemonsDataArray["pokeIndex"].stats[2].stat.name = defense
          Pfad zur Attack Number: pokemonsDataArray["pokeIndex"].stats[2].base_stat = 49
