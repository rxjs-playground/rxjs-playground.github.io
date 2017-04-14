import React ,{Component} from 'react';

export default class Navbar extends Component{
  state = {
    active : false
  }
  toggleActive = () => this.setState((state)=>{
    return {
      active : !this.state.active
    }
  })
  renderChildren(){
    return [
          <div className="tutorial-group"></div>,
          <div className="tutorial-group"></div>
    ]
  }
  render(){
    return [
      <header id="navbar" className={this.state.active ? "active" : ""}>
        <button onClick={this.toggleActive}>Explore</button>
        <div className="tutorial-groups">
          {this.renderChildren()}
        </div>
      </header>
    ]
  }
}
