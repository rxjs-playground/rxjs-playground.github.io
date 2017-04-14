import React ,{Component} from 'react';

export default class Header extends Component{
  render(){
    return [
      <header id="header">
        <h1> Rx.js Playground </h1>
        <p> Built with <i className="em em-blue_heart"></i> by <a target="_blank" href="http://github.com/bhargav175">bhargav175</a> </p>
      </header>
    ]
  }
}
