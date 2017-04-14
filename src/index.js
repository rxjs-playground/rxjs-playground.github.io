import "./sass/index.scss";
import 'rxjs';
import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './app';

function Main(){
  return <App/>;
}

render(<Main/> , document.getElementById("reactapp"));
