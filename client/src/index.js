import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './index.css';
import App from './App';
import TopBar from './TopBar';

const test_dataset = [
  { id: 1, name: 'Tommy', age: 21, hobby: 'coding' },
  { id: 2, name: 'Anna', age: 19, hobby: 'reading' },
  { id: 3, name: 'Bobby', age: 16, hobby: 'swimming' },
  { id: 4, name: 'Lauren', age: 25, hobby: 'running' }
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TopBar />
    <App data={test_dataset}/>
  </React.StrictMode>
);
