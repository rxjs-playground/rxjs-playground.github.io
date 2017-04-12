import React ,{Component} from 'react';
import Codemirror from 'codemirror';

export default class Editor extends Component{
  componentDidMount(){
    Codemirror.fromTextArea(this.textarea, {
       lineNumbers: true,
       mode: {
           name: "javascript",
           json: true,
           globalVars: true
       },
       theme : "dracula",
       lineNumbers : true,
      extraKeys: {
          "Tab": "autocomplete"
      },
      autofocus: true,
      autoCloseBrackets: true,
      historyEventDelay: 2000,
    });
  }
  render(){
    return <div id="editor">
      <textarea id="editorinput" ref={n => this.textarea = n}>
      </textarea>
    </div>
  }
}
