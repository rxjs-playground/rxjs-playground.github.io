import React ,{Component} from 'react';
import Editor from './editor';
import ConsoleOutput from './consoleOutput';
import Output from './output';

export default class Playground extends Component{
  render(){
    return [
      <div id="playground">
        <Editor/>
        <ConsoleOutput/>
        <Output/>
      </div>
    ]
  }
}
