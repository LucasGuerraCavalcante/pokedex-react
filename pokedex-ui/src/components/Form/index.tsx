import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

import Pokemon from '../Pokemon'

import './styles.css'

const Form: React.FC = () => {

  const [pokemons, setPokemons] = useState<string[]>([])

  const [selectedGeneration, setSelectedGeneration] = useState<string>('1')
  const [selectedPokemon, setSelectedPokemon] = useState<string>('bulbasaur')

  const [formData, setFormData] = useState<string>('bulbasaur')

  useEffect(() => {
      axios.get<string[]>(`http://localhost:3333/generation/${selectedGeneration}/species`)
          .then(response => {
              console.log(response)
              const pokemonNames = response.data.map(pokemon => pokemon)
              setPokemons(pokemonNames)
          })
          .catch(err => console.error(err))
  }, [selectedGeneration])

  function handleSelectedGeneration(event: ChangeEvent<HTMLSelectElement>) {
    const generation = event.target.value
    setSelectedGeneration(generation)
  }

  function handleSelectPokemon(event: ChangeEvent<HTMLSelectElement>) {
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

          <select id="pokemonSelect" name="pokemon" 
            value={ selectedPokemon }
            onChange={ handleSelectPokemon } >

            <option key={0} value="0">Pokemon's Name</option>
            { pokemons.map(pokemon => (
                <option key={pokemon} value={pokemon}>{pokemon}</option>
            ))}
          </select>

          <button type="submit">Search</button>   
      </form>

      <Pokemon selectedPokemonName={ formData } />
    </>
  );
};

export default Form;