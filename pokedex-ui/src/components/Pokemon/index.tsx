import React from 'react'

import './styles.css'

interface pokemon {
  selectedPokemonName: string;
}

const Pokemon: React.FC<pokemon> = ({ selectedPokemonName }) => {

  return (
    <div className="pokemon">
        <span>A</span>
        <h3>{ selectedPokemonName }</h3>
        <span>A</span>     
    </div>
  )
}

export default Pokemon