import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ToDo1 from './Components/ToDo1/ToDo1';
import ToDo2 from './Components/ToDo2/ToDo2';
import ToDo3 from './Components/ToDo3/ToDo3';
import ToDo4 from './Components/ToDo4/ToDo4';
import ToDo5 from './Components/ToDo5/ToDo5';

const App = () => (
  <div className="App">
    <ToDo1 />
    <ToDo2 />
    <ToDo3 />
    <ToDo4 />
    <ToDo5 />

  </div>
);

export default App;
