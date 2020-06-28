import React from 'react';

import './styles.css';

import Header from '../Header';
import Form from '../Form';
import Pokemon from '../Pokemon';

const Content: React.FC = () => {
  return (
    <div className="container">
        <Header />
        <Form />
        <Pokemon />
    </div>
  );
};

export default Content;