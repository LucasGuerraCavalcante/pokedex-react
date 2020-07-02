import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.css'

interface pokemon {
  selectedPokemonName: string;
}

const Pokemon: React.FC<pokemon> = ({ selectedPokemonName }) => {

  const [pokemonName, setPokemonName] = useState<string>(selectedPokemonName)

  const [selectedPokemonData, setSelectedPokemonData] = useState<any>({})

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
        <h3 >{ selectedPokemonData.name }</h3>
        <h3 >{ selectedPokemonData.height }</h3>
        <h3 >{ selectedPokemonData.weight }</h3>
        <h3 >{ selectedPokemonData.id }</h3>
        <img src={ selectedPokemonData.male } ></img>
        <span>A</span>     
    </div>
  )
}

export default Pokemon