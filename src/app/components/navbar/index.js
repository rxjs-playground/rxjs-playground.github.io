import React ,{PropTypes, Component} from 'react';
import BeginnerTuts from '../../content/beginner';
import queryString from 'query-string';


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
  toggleActive = () => this.setState((state)=>{
    return {
      active : !this.state.active
    }
  })

  renderTut = (detail_tutorial) => {
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
      <header id="navbar" className={this.state.active ? "active" : ""}>
        <div>
          <button onClick={this.toggleActive}>Explore</button>
        </div>
        {this.renderChildren()}
      </header>
    ]
  }
}
