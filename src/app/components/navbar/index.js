import React ,{PropTypes, Component} from 'react';
import BeginnerTuts from '../../content/beginner';
import queryString from 'query-string';
import {Observable} from 'rxjs/Observable';

class DetailTutorial extends Component {
  render(){
    const {tutorial} = this.props;
    return <div className = "tutorial-detail">
      <div className="tutorial-meta">
        <p> {tutorial.title} </p>
        <p> {tutorial.description || ""} </p>
      </div>
      <div className="tutorial-html">
        <p> HTML </p>
        <p> {tutorial.editor.html} </p>
      </div>
      <div className="tutorial-js">
        <p> Javascript </p>
        <p> {tutorial.editor.js} </p>
      </div>
    </div>
  }
}

const initialState = {
  active : false,
  detail_tutorial : null
}

export default class Navbar extends Component{
  static contextTypes = {
    router : PropTypes.any
  }
  state = {
    ...initialState
  }
  componentDidMount(){

     const [exploreBtnClickStream, otherClick] = Observable.fromEvent(document, "click").partition(e => e.target === this.exploreBtn);
     exploreBtnClickStream.subscribe(e => this.setState((state) => {
       return {
          active : !state.active
       };
     }));
     otherClick.filter(e => this.state.active && !this.root.contains(e.target))
      .subscribe(e => this.setState({active : false})) ;

  }
  componentWillUnmount(){
    this.exploreSubscription.unsubscribe();
  }
  setActive = active => this.setState({ active})

  renderTut = (detail_tutorial, e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState(state=>({
      detail_tutorial
    }))
  }

  viewTutorial = () => {
    const {detail_tutorial : {editor : {js,html}}} = this.state;
    this.context.router.history.push(`/try?${queryString.stringify({
      js  ,
      html
    })}`)
  }

  renderDetailTutorial(){
    const {detail_tutorial} = this.state;
    return [
      <div className="go-back"><button onClick={this.renderTut.bind(null,null)}> Go back </button></div>,
      <DetailTutorial tutorial={detail_tutorial} />,
      <div className="try-this-tutorial">
        <button onClick={this.viewTutorial}>Try it</button>
      </div>
    ]
  }

  renderTutorials(){
    return [
          <div className="tutorial-group">
            <h3> Beginner </h3>
            <ul className="tutorials">
              {BeginnerTuts.map((tut, index) => <li key={index} onClick={this.renderTut.bind(null, tut)} className="tutorial"> {tut.title} </li> )}
            </ul>
          </div>,
          <div className="tutorial-group">
            <h3> Intermediate </h3>
          </div>,
          <div className="tutorial-group">
            <h3> Advanced </h3>
          </div>,
          <div className="tutorial-group">
            <h3> Other </h3>
          </div>
    ]
  }
  renderChildren(){
    if(this.state.detail_tutorial){
       return  this.renderDetailTutorial()
    }else {
      return <div className="tutorial-groups">
        {this.renderTutorials()}
      </div>
    }
  }
  render(){
    return [
      <header id="navbar" className={this.state.active ? "active" : ""} ref={n => this.root = n}>
        <div>
          <button ref={n => this.exploreBtn = n}>Explore</button>
        </div>
        {this.renderChildren()}
      </header>
    ]
  }
}
