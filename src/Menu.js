import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LearningWords from './Learning/Learning'
import WordsManager from './WordsManager/WordsManager'


export class Menu extends React.Component {


  render() {
    return (
      <div className="menu">
        <div className="menuButton" onClick={() => this.props.handleChangeView("Dashboard")}> Dashboard   </div>
        <div className="menuButton" onClick={() => this.props.handleChangeView("Choosing")}> Choosing </div>
        <div className="menuButton" onClick={() => this.props.handleChangeView("Learning")}> Learning </div>
      </div>
         
    );
  }
} 

export default Menu