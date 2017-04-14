import React ,{Component} from 'react';

export default class Header extends Component{
  render(){
    return [
      <header id="header">
        <h1> Rx.js Playground </h1>
        <p> Built with <i className="fa fa-heart"></i> by <a target="_blank" href="http://github.com/bhargav175">bhargav175</a></p>
        <p><a className="github-button" href="https://github.com/rxjs-playground/rxjs-playground.github.io" data-icon="octicon-star" data-style="mega" data-count-href="/rxjs-playground/rxjs-playground.github.io/stargazers" data-count-api="/repos/rxjs-playground/rxjs-playground.github.io#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star rxjs-playground/rxjs-playground.github.io on GitHub">Star</a></p>
      </header>
    ]
  }
}
