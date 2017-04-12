import React ,{Component} from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Playground from './core';

export default class App extends Component{
  render(){
    return [
      <Header />,
      <div id="row">
        <Sidebar/>
        <div id="main">
          <Playground/>
        </div>
      </div>
    ]
  }
}
