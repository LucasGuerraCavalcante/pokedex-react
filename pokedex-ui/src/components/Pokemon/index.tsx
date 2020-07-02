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
  male: string,
  female?: string,
  shinyMale: string,
  shinyFemale?: string,
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
    male: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    female: undefined,
    shinyMale: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    shinyFemale: undefined,
    abilities: [
      "chlorophyll",
      "overgrow"
      ],
    types: [
      "grass",
      "poison"
      ]
  })

  const [formatedPokemonName, setFormatedPokemonName] = useState<string>('')

  useEffect(() => {
    setPokemonName(selectedPokemonName)
  })

  useEffect(() => {
    axios.get<any>(`http://localhost:3333/pokemon/${selectedPokemonName}`)
        .then(response => {
            const pokemonInfo = response.data
            setSelectedPokemonData(pokemonInfo)
        })
        .catch(err => console.error(err))
  }, [pokemonName])

  return (
    <div className="pokemon">
        <span >A</span>
        <h3>{ selectedPokemonData.name }</h3>
        <h3>{ selectedPokemonData.height }</h3>
        <h3>{ selectedPokemonData.weight }</h3>
        <h3>{ selectedPokemonData.id }</h3>
        <img src={ selectedPokemonData.male } ></img>
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
        <span>A</span>     
    </div>
  )
}

export default Pokemon