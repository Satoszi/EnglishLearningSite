import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LearningWords from './Learning/Learning'
import WordsManager from './WordsManager/WordsManager'
import logo from './learning.png';
import learn from './learning.png'
import pick from './picking.png'
import dashboard from './dashboard.png'

export class Menu extends React.Component {


  render() {
    return (
      <div className="menuBar">
        <div className = "menu">
        <div className="menuButton" 
         onClick={() => this.props.handleChangeView("Dashboard")}>
            <img className = "icon"
            src={dashboard}
            alt="Logo"/>
        <div className = "iconText" >Dashboard</div>
        </div>

        <div className="menuButton" 
         onClick={() => this.props.handleChangeView("Choosing")}>
            <img className = "icon"
            src={pick}
            alt="Logo"/>
        <div className = "iconText" >Pick Words</div>
        </div>

        <div className="menuButton" 
         onClick={() => this.props.handleChangeView("Learning")}>
            <img className = "icon"
            src={learn}
            alt="Logo"/>
        <div className = "iconText" >Learn</div>
        </div>


        </div>
      </div>
         
    );
  }
} 

export default Menu