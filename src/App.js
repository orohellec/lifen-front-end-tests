import React from 'react';

import './App.css';
import Dropzone from './components/Dropzone/Dropzone';

const App = () => {
  return (
    <div className="app">
      <div className="card">
        <span>Cliquer ou glisser déposer pour ajouter des fichiers PDF</span>
        <span>taille max (2MB)</span>
        <Dropzone />
      </div>
    </div>
  );
}

export default App;
