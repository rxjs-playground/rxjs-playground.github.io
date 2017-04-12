import React ,{PropTypes, Component} from 'react';
import { transform } from 'babel-standalone';
import Editor from './editor';
import ConsoleOutput from './consoleOutput';
import Output, {CONSOLE_EVENT} from './output';
import HTMLPane from './html';
import queryString from 'query-string';
import {Observable} from 'rxjs/Observable';


function compile(source) {

    let transformed;
    const code = ` \n${source}`;
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
      source : js || "",
      output : compile(js),
      html : html || "",
      show : true
    }
  }

  getChildContext(){
    return {
      setSource : this.setSource,
      source : this.state.source,
      output : this.state.output,
      html : this.state.html,
      setHtml : this.setHtml,
    }
  }

  setSource = source => {
    const output  = compile(source);
    return this.setState(function(){
      return {source , output}
    }, function(){
      this.transition()
    });
  };
  setHtml = html => {
    this.setState(function(){
      return {
        html
      }
    }, function(){
      this.transition();
    });
  }

  transition = () =>{
    this.context.router.history.push(`/?${queryString.stringify({
      js : this.state.source,
      html :this.state.html
    })}`)
  }

  clearConsole = () =>  this.consoleRef.clear();

  run = () => {
    this.clearConsole();
    this.outputRef.run();
  }

  stop = () => {
    Observable.of(false).concat(Observable.interval(100).first().map(e=>true)).subscribe(val => {
      this.setState(()=>{
        return {
          show : val
        }
      })
    });
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
