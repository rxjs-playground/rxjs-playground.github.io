import React ,{PropTypes, Component} from 'react';
import BeginnerTuts from '../../content/beginner';
import AdvancedTuts from '../../content/advanced';
import IntermediateTus from '../../content/intermediate';
import OtherTuts from '../../content/other';
import queryString from 'query-string';
import {Observable} from 'rxjs/Observable';
import shorturl from '../../utils/shorten_url';
import Codemirror from 'codemirror';

class DetailTutorial extends Component {
  componentDidMount(){
    Codemirror.fromTextArea(this.jsNode, {
       lineNumbers: true,
       readOnly : true,
       mode: {
           name: "javascript",
       },
       cursorBlinkRate : 0,
       theme : "dracula"
    });

    Codemirror.fromTextArea(this.htmlNode, {
       lineNumbers: true,
       readOnly : true,
       mode: {
           name: "htmlmixed",
           json: true,
           globalVars: true
       },
       cursorBlinkRate : 0,
       theme : "dracula"
    });
  }
  render(){
    const {tutorial} = this.props;
    return <div className = "tutorial-detail">
      <div className="tutorial-meta">
        <p> {tutorial.title} {this.props.tryIt}</p>
        <p> {tutorial.description || ""} </p>
      </div>
      <div className="tutorial-content">
        <div className="tutorial-html">
          <p> HTML </p>
          <textarea ref={n => this.htmlNode = n} defaultValue={tutorial.editor.html} />
        </div>
        <div className="tutorial-js">
          <p> Javascript </p>
          <textarea ref={n => this.jsNode = n } defaultValue={tutorial.editor.js} />
        </div>
      </div>
    </div>
  }
}

const initialState = {
  active : false,
  detail_tutorial : null,
  short_url : null
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
     const s1 = exploreBtnClickStream.subscribe(e => this.setState((state) => {
       return {
          active : !state.active,
          detail_tutorial : !state.active ? null : state.detail_tutorial
       };
     }));
     const s2 = otherClick.filter(e => this.state.active && !this.root.contains(e.target))
      .subscribe(e => this.setState({active : false})) ;
     this.subscriptions = [s1,s2];
  }
  componentWillUnmount(){
    this.subscriptions.forEach(s => s.unsubscribe());
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
    this.setState({active : false});
    this.context.router.history.push(`/try?${queryString.stringify({
      js  ,
      html
    })}`)
  }

  renderDetailTutorial(){
    const {detail_tutorial} = this.state;
    return [
      <div className="go-back"><button onClick={this.renderTut.bind(null,null)}> &lt;&lt; Go back </button></div>,
      <DetailTutorial tutorial={detail_tutorial} tryIt={ <button className="try-button" onClick={this.viewTutorial}>Try it</button>} />,

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
            <ul className="tutorials">
            {IntermediateTus.map((tut, index) => <li key={index} onClick={this.renderTut.bind(null, tut)} className="tutorial"> {tut.title} </li> )}
            </ul>
          </div>,
          <div className="tutorial-group">
            <h3> Advanced </h3>
            <ul className="tutorials">
            {AdvancedTuts.map((tut, index) => <li key={index} onClick={this.renderTut.bind(null, tut)} className="tutorial"> {tut.title} </li> )}
            </ul>
          </div>,
          <div className="tutorial-group">
            <h3> Other </h3>
            <ul className="tutorials">
            {OtherTuts.map((tut, index) => <li key={index} onClick={this.renderTut.bind(null, tut)} className="tutorial"> {tut.title} </li> )}
            </ul>
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
  getShareButton = () => {
    shorturl(window.location.href).then(result =>{
      	this.setState(()=>{
          return {
            short_url : result
          }
        });
    });

  }
  render(){
    return [
      <header id="navbar" className={this.state.active ? "active" : ""} ref={n => this.root = n}>
        <div>
          <button ref={n => this.exploreBtn = n}>Explore</button>
          <button onClick={this.getShareButton}>Share</button>
          {this.state.short_url ? <input defaultValue={this.state.short_url}/> : null }
      </div>
        {this.renderChildren()}
      </header>
    ]
  }
}
