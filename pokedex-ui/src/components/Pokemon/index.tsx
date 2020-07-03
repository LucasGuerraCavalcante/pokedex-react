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
  const [pokemonId, setPokemonId] = useState<number>(1)
  const [iconStatus, setIconStatus] = useState<boolean>(true)


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
            setPokemonId(pokemonInfo.id)
        })
        .catch(err => console.error(err))
  }, [pokemonName])

  function changeIcon(iconStatus: boolean) {
    if (iconStatus === true) {
      setIconStatus(false)
    } else {
      setIconStatus(true)
    }
  }

  function nextPokemon(id: number) {
      axios.get<any>(`http://localhost:3333/pokemon/${id + 1}`)
      .then(response => {
          const pokemonInfo = response.data
          setSelectedPokemonData(pokemonInfo)
          setPokemonId(pokemonInfo.id)
      })
      .catch(err => 
        axios.get<any>(`http://localhost:3333/pokemon/${id}`)
        .then(response => {
            const pokemonInfo = response.data
            setSelectedPokemonData(pokemonInfo)
            setPokemonId(pokemonInfo.id)
      })
    )
  }

  function previousPokemon(id: number) {
    if (id === 1) {
      alert('First pokemon of the Generation')
    } else {
      axios.get<any>(`http://localhost:3333/pokemon/${id - 1}`)
      .then(response => {
          const pokemonInfo = response.data
          setSelectedPokemonData(pokemonInfo)
          setPokemonId(pokemonInfo.id)
      })
      .catch(err => 
        axios.get<any>(`http://localhost:3333/pokemon/${id}`)
        .then(response => {
            const pokemonInfo = response.data
            setSelectedPokemonData(pokemonInfo)
            setPokemonId(pokemonInfo.id)
      }))
    }
  }

  return (
    <div className="pokemon">
        <h3>{ selectedPokemonData.name.toUpperCase().split('-').join(' ') }</h3>

        <div className="icon-container">
          {
            iconStatus ? (
              <img alt="pokemonIcon" src={ selectedPokemonData.img } ></img> 
            ) : (
              <img alt="pokemonIconShiny" src={ selectedPokemonData.shinyImg } ></img> 
            )
          }
          <p>{ selectedPokemonData.id }</p>
        </div>

        <div className="joystick-container">
          <div onClick={() => previousPokemon(pokemonId)}>
            <IoMdArrowRoundBack  className="icon arrow" />
          </div>
          <div onClick={() => changeIcon(iconStatus)}>
            <GiStarsStack className="icon stars" />
          </div>
          <div onClick={() => nextPokemon(pokemonId)}>
            <IoMdArrowRoundForward  className="icon arrow" />
          </div>
        </div>

        <div className="hw-container">
          <p className="hwInfo">Height: { selectedPokemonData.height }</p>
          <p className="hwInfo">Weight: { selectedPokemonData.weight }</p> 
        </div>

        <table>
          <tr>
          { selectedPokemonData.types.map((type: string) => 
            <th key={type} className={type}>{ type }</th>)}
          </tr>
        </table>

        <h4>Abilities</h4>

        <table>
          <tr>
          { selectedPokemonData.abilities.map((ability: string) => 
            <th key={ability}>{ ability.split('-').join(' ') }</th>)}
          </tr>
        </table>

    </div>
  )
}

export default Pokemon