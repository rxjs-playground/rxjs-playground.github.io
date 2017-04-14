import React ,{Component} from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Playground from './core';
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
  render(){
    return [
      <Header />,
      <Navbar/>,
      <Router>
        <div id="row">
          <div id="main">
                <Switch>
                  <Route exact path="/" component={Playground}/>
                  <Route component={NotFound} />
                </Switch>
          </div>
        </div>
      </Router>
    ]
  }
}
