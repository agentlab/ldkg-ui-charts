import React from 'react';
import logo from './logo.svg';
import './App.css';
import { rootModelState } from './store/data';

function App() {

  console.log(rootModelState.colls["es:Observations_11_CollConstr"].dataIntrnl);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
