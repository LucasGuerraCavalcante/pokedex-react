import React from 'react';

import './styles.css';

import { FaRegLightbulb } from 'react-icons/fa'
// import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

const Header: React.FC = () => {
  return (
    <div className="header">
        <h1 className="tittle">React Pokedex</h1>
        <div className="toggle">
            <FaRegLightbulb  className="icon" />
            <input id="switch" type="checkbox" name="theme" />
            <label id="toggleLabel" htmlFor="switch">Toggle</label>
        </div>     
    </div>
  );
};

export default Header;