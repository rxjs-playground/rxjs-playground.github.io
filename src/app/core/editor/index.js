import React, {PropTypes, Component} from 'react';
import Codemirror from 'codemirror';
import {Observable} from 'rxjs/Observable';

export default class Editor extends Component{

  static contextTypes = {
    setSource : PropTypes.func.isRequired
  }

  componentDidMount(){
    const input = Codemirror.fromTextArea(this.textarea, {
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
    Observable.fromEvent(input,"change").debounceTime(1000)
          .map(e=>input.getValue())
          .subscribe(source => this.context.setSource(source));
  }
  handleKeydown=(e)=>{
    console.log(e);
  }
  render(){
    return <div id="editor">
      <div>
      <textarea id="editorinput" onKeyDown={this.handleKeydown} ref={n => this.textarea = n}>
      </textarea></div>
    </div>
  }
}
