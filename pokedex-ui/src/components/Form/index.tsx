import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

import Pokemon from '../Pokemon'

import './styles.css'

interface Props  {
  name?: string
}

const Form: React.FC = () => {

  const [pokemons, setPokemons] = useState<string[]>([])

  const [selectedGeneration, setSelectedGeneration] = useState<string>('1')
  const [selectedPokemon, setSelectedPokemon] = useState<string>('')

  const [formData, setFormData] = useState<string>('')

  useEffect(() => {
      axios.get<string[]>(`http://localhost:3333/generation/${selectedGeneration}/species`)
          .then(response => {
              const pokemonNames = response.data.map(pokemon => pokemon)
              setPokemons(pokemonNames)
          })
  }, [selectedGeneration])

  function handleSelectedGeneration(event: ChangeEvent<HTMLSelectElement>) {
    const generation = event.target.value
    setSelectedGeneration(generation)
  }

  function handleSelectPokemon(event: ChangeEvent<HTMLInputElement>) {
    const pokemon = event.target.value
    setSelectedPokemon(pokemon)
  }

  function sendPokemon(event: FormEvent) {
    event.preventDefault()

    const selectedPokemonName = selectedPokemon
    setFormData(selectedPokemonName)
  }

  return (
    <>
      <form className="form" onSubmit={ sendPokemon } >

          <select id="generationSelect" name="generation" 
            value={ selectedGeneration }
            onChange={ handleSelectedGeneration } >
            <option key={1} value="1">Generation 1</option>
            <option key={2} value="2">Generation 2</option>
            <option key={3} value="3">Generation 3</option>
            <option key={4} value="4">Generation 4</option>
            <option key={5} value="5">Generation 5</option>
            <option key={6} value="6">Generation 6</option>
            <option key={7} value="7">Generation 7</option>
          </select>

          <input type="text" list="pokemons" id="pokemonInput"
                placeholder="Pokemon's Name"
                onInput={ handleSelectPokemon }></input>
          <datalist id="pokemons">

            { pokemons.map(pokemon => (
                <option key={pokemon} value={pokemon}>{pokemon}</option>
            ))}

          </datalist>

          <button type="submit">Search</button>   
      </form>

      <Pokemon selectedPokemonName={ formData } />
    </>
  );
};

export default Form;