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
    this.subscription = Observable.fromEvent(document, CONSOLE_EVENT).subscribe(e =>  {
      console.log.apply(console.log, e.detail.args);
      this.consoleAppend(JSON.stringify(e.detail.args.join(" "),null,4));
    });
  }
  componentWillUnmount(){
    this.subscription.unsubscribe();
  }
  clear = () => this.setState({consoleOutputs : []})
  render(){
    return <div id="console">
      <h3>Console</h3>
      <div>
        {this.state.consoleOutputs.map((p,index)=><pre key={index}>{p}</pre>)}
      </div>
    </div>
  }
}
