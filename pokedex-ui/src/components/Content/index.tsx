import React from 'react';

import './styles.css';

import Header from '../Header';
import Form from '../Form';

const Content: React.FC = () => {
  return (
    <div className="container">
        <Header />
        <Form />
    </div>
  );
};

export default Content;