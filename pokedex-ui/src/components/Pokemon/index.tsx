import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.css'

interface pokemonName {
  selectedPokemonName: string
}

interface pokemonData {
  id: number,
  name: string,
  height: number,
  weight: number,
  img: string,
  shinyImg: string,
  abilities: string[],
  types: string[]
}

const Pokemon: React.FC<pokemonName> = ({ selectedPokemonName }) => {

  const [pokemonName, setPokemonName] = useState<string>(selectedPokemonName)

  const [selectedPokemonData, setSelectedPokemonData] = useState<pokemonData>({
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    shinyImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    abilities: [
      "chlorophyll",
      "overgrow"
      ],
    types: [
      "grass",
      "poison"
      ]
  })

  useEffect(() => {
    setPokemonName(selectedPokemonName)
  }, [selectedPokemonName])

  useEffect(() => {
    axios.get<any>(`http://localhost:3333/pokemon/${pokemonName}`)
        .then(response => {
            const pokemonInfo = response.data
            setSelectedPokemonData(pokemonInfo)
        })
        .catch(err => console.error(err))
  }, [pokemonName])

  return (
    <div className="pokemon">
        <h3>{ selectedPokemonData.name.toUpperCase().split('-').join(' ') }</h3>
        <h3>{ selectedPokemonData.height }</h3>
        <h3>{ selectedPokemonData.weight }</h3>
        <h3>{ selectedPokemonData.id }</h3>
        <img alt="pokemonIcon" src={ selectedPokemonData.img } ></img>
        <img alt="pokemonIconShiny" src={ selectedPokemonData.shinyImg } ></img>
        <ol>
          { selectedPokemonData.abilities.map((ability: string) => 
            <li key={ability}>{ ability }</li>)
          }
        </ol>
        <ol>
          { selectedPokemonData.types.map((type: string) => 
            <li key={type}>{ type }</li>)
          }
        </ol> 
    </div>
  )
}

export default Pokemon