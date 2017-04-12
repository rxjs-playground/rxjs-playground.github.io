import React ,{PropTypes, Component} from 'react';
import { transform } from 'babel-standalone';
import Editor from './editor';
import ConsoleOutput from './consoleOutput';
import Output, {CONSOLE_EVENT} from './output';
import HTMLPane from './html';



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
        console.log(err.message.replace(/(?=\d).*(?=\|)/g, function(a) {
            return Number(a.trim()) - 1;
        }));
        return source;
    }
};

export default class Playground extends Component{
  static childContextTypes = {
    setSource : PropTypes.func,
    setHtml : PropTypes.func,
    source : PropTypes.string,
    output : PropTypes.string,
    html : PropTypes.string,
  }

  constructor(props){
    super(props);
    this.state = {
      source : "",
      output : "",
      html : "",
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
    return this.setState({source , output})
  };
  setHtml = html => this.setState({html})

  clearConsole = () =>  this.consoleRef.clear();
  
  run = () => {
    this.clearConsole();
    this.outputRef.run();
  }

  render(){
    return [
      [
        <div id="playground--headers">
            <h3>Javascript</h3>
            <h3>HTML</h3>
            <h3>Console  <button onClick={this.run}>Run</button> <button onClick={this.clearConsole}>Clear</button></h3>
            <h3>Output </h3>
        </div>
      ],
      <div id="playground">
        <Editor/>
        <HTMLPane/>
        <ConsoleOutput ref={n => this.consoleRef = n}/>
        <Output ref={n => this.outputRef = n}/>
      </div>
    ]
  }
}
