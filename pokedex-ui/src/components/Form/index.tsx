import React from 'react';

import './styles.css';

function findPokemon() {

}

const Form: React.FC = () => {
  return (
    <form className="form" onSubmit={findPokemon} >

        <select id="generationSelect" >
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
        </select>

        <input type="text" list="pokemons" id="pokemonInput" 
              placeholder="Pokemon's Name" ></input>
        <datalist id="pokemons">
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
          <option value="test">test</option>
        </datalist>

        <button type="submit">Search</button>   
    </form>
  );
};

export default Form;