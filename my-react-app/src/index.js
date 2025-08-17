import {React,useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);