import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { GiStarsStack } from 'react-icons/gi'

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
        <div className="icon-container">
          <img alt="pokemonIcon" src={ selectedPokemonData.img } ></img>
          {/* <img alt="pokemonIconShiny" src={ selectedPokemonData.shinyImg } ></img> */}
          <p>{ selectedPokemonData.id }</p>
        </div>
        <div className="joystick-container">
          <IoMdArrowRoundBack  className="icon arrow" />
          <GiStarsStack className="icon stars" />
          <IoMdArrowRoundForward  className="icon arrow" />
        </div>
        <div className="hw-container">
          <p className="hwInfo">Height: { selectedPokemonData.height }</p>
          <p className="hwInfo">Weight: { selectedPokemonData.weight }</p> 
        </div>

        <table>
          <tr>
          { selectedPokemonData.types.map((type: string) => 
            <th className={type}>{ type }</th>)}
          </tr>
        </table>

        <h4>Abilities</h4>

        <table>
          <tr>
          { selectedPokemonData.abilities.map((ability: string) => 
            <th>{ ability.split('-').join(' ') }</th>)}
          </tr>
        </table>

    </div>
  )
}

export default Pokemon