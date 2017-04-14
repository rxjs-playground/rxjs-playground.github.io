import React ,{PropTypes, Component} from 'react';
import { transform } from 'babel-standalone';
import Editor from './editor';
import ConsoleOutput from './consoleOutput';
import Output, {CONSOLE_EVENT} from './output';
import HTMLPane from './html';
import queryString from 'query-string';
import Rx from 'rxjs';
import {Observable} from 'rxjs/Observable';
import './codemirrorhelper';

function compile(source) {

    let transformed;
    const code = `\n${source}`;
    try {
        transformed = transform(code, {
            filename: 'rxjs',
            "presets": [
                "es2015",
                "stage-0"
            ]
        });

        const transformedCode = transformed.code;
        return transformedCode;
    } catch (err) {

        var event = new CustomEvent(CONSOLE_EVENT, { detail : {
          message : err.message.replace(/(?=\d).*(?=\|)/g, function(a) {
              return Number(a.trim()) - 1;
          })
        }});
        parent.window.document.dispatchEvent(event)
        return source;
    }
};

export default class Playground extends Component{
  static contextTypes = {
    router : PropTypes.any
  }
  static childContextTypes = {
    setSource : PropTypes.func,
    setHtml : PropTypes.func,
    source : PropTypes.string,
    output : PropTypes.string,
    html : PropTypes.string,
  }

  constructor(props){
    super(props);
    const {html,js} = queryString.parse(props.location.search);
    this.state = {
      output : compile(js),
      show : true,
      isRunning : false
    }
  }

  componentWillReceiveProps(newProps){
    const {js : nJs} = queryString.parse(newProps.location.search);
    const {js} = queryString.parse(this.props.location.search);
    if(js !== nJs){
      const output = compile(nJs);
      this.setState({output});
    }
  }

  getChildContext(){
    const {html,js} = queryString.parse(this.props.location.search);

    return {
      setSource : this.setSource,
      source : js,
      output : this.state.output,
      html : html,
      setHtml : this.setHtml,
    }
  }

  setSource = js => {
    const {html} = queryString.parse(this.props.location.search);
    this.transition({
      js,
      html
    })
  };
  setHtml = html => {
    const {js} = queryString.parse(this.props.location.search);
    this.transition({html, js});
  }

  transition = ({html, js}) =>{
    this.context.router.history.push(`/?${queryString.stringify({
      html,
      js
    })}`)
  }

  clearConsole = () =>  this.consoleRef.clear();

  run = () => {
    if(this.state.isRunning){
      return;
    }
    this.setState((state)=>{
      return {
        isRunning : true
      }
    }, () => {
      this.clearConsole();
      this.outputRef.run();
    });
  }

  stop = () => {
    return new Promise((resolve)=>{
      this.setState(()=>{
        return {
          show : false,
          isRunning : false
        }
      });
      setTimeout(()=>{
        this.setState(()=>{
          return {
            show : true,

          }
        },() => resolve());

      },100)
    })
  }

  render(){
    const {show} = this.state;
    if(!show){
      return null;
    }
    return [
      <div id="playground">
        <div className="playground-column">
          <div className="playground-row">
            <Editor/>
            <HTMLPane/>
            </div>
        </div>
        <div className="playground-column">
          <p><button onClick={this.run}>Run</button> <button onClick={this.clearConsole}>Clear</button> <button onClick={this.stop}>Stop</button></p>
          <div className="playground-outputs">
            <div className="playground-column">
              <ConsoleOutput ref={n => this.consoleRef = n}/>
            </div>
            <div className="playground-column">
              <Output ref={n => this.outputRef = n}/>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

export class Try extends Component{
  static contextTypes = {
    router : PropTypes.any
  }
  componentDidMount(){
    const {html,js} = queryString.parse(this.props.location.search);
    this.context.router.history.push(`/?${queryString.stringify({
      html,
      js
    })}`)
  }
  render(){
    return null;
  }
}
