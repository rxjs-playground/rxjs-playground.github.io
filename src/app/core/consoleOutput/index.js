import React ,{PropTypes, Component} from 'react';
import {CONSOLE_EVENT} from '../output';
import {Observable} from 'rxjs/Observable';

export default class Console extends Component{
  state = {
    consoleOutputs : []
  }
  consoleAppend = message => {

    this.setState(function(state,props){
      return {
        consoleOutputs : [...state.consoleOutputs,message]
      }
    });

  }
  componentDidMount(){
    Observable.fromEvent(document, CONSOLE_EVENT).subscribe(e =>  {
      this.consoleAppend(JSON.stringify(e.detail.message,null,4));
    });
  }
  clear = () => this.setState({consoleOutputs : []})
  render(){
    return <div id="console">
      <div>
        {this.state.consoleOutputs.map((p,index)=><pre key={index}>{p}</pre>)}
      </div>
    </div>
  }
}
