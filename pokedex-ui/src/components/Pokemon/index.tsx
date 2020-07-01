import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.css'

interface pokemon {
  selectedPokemonName: string;
}

const Pokemon: React.FC<pokemon> = ({ selectedPokemonName }) => {

  const [selectedPokemonData, setSelectedPokemonData] = useState<any>({})

  useEffect(() => {
    axios.get<any>(`http://localhost:3333/pokemon/${selectedPokemonName}`)
        .then(response => {
            const pokemonInfo = response.data
            setSelectedPokemonData(pokemonInfo)
        })
        .catch(err => console.error(err))
  })

  return (
    <div className="pokemon">
        <span >A</span>
        <h3 >{ selectedPokemonData.name }</h3>
        <h3 >{ selectedPokemonData.height }</h3>
        <h3 >{ selectedPokemonData.weight }</h3>
        <span>A</span>     
    </div>
  )
}

export default Pokemon