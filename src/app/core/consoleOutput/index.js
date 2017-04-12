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
      console.log(e.detail.message);
      this.consoleAppend(e.detail.message);
    });
  }
  clear = () => this.setState({consoleOutputs : []})
  render(){
    return <div id="console">
      <ul>
        {this.state.consoleOutputs.map((p,index)=><li key={index}>{p}</li>)}
      </ul>
    </div>
  }
}
