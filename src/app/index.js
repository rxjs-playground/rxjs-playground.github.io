import React ,{Component} from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Playground, {Try} from './core';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function NotFound(props){
  return [
    <h1> Not Found</h1>,
    <p> Go back to <Link to={'/'}>Home</Link></p>
  ];
}

export default class App extends Component{
  renderChildren(){
    return [
      <Header key={0} />,
      <Navbar key={1}/>,
      <div key={2} id="row">
        <div id="main">
              <Switch>
                <Route exact path="/" component={Playground}/>
                <Route exact path="/try" component={Try}/>
                <Route component={NotFound} />
              </Switch>
        </div>
      </div>
    ]
  }
  render(){
    return [
      <Router>
        <div id="app">
          {this.renderChildren()}
        </div>
      </Router>
    ]
  }
}
