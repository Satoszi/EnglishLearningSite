import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import ChoosingWords from './Choosing'
import LearningWords from './Learning/Learning'
import WordsManager from './WordsManager/WordsManager'
import { flushSync } from 'react-dom';

class Menu extends React.Component {

  handleChangeView(viewName){
    console.log(viewName)
    this.props.changeView(viewName)
  }

  render() {
    return (
      <div className="menu">
        <div className="menuButton" > Dashboard   </div>
        <div className="menuButton" onClick={() => this.handleChangeView("Choosing")}> Choosing </div>
        <div className="menuButton" onClick={() => this.handleChangeView("Learning")}> Learning </div>
      </div>
         
    );
  }
} 
  
function ReturnView (props){
  if (props.viewName == 'Learning')
    return <LearningWords/>;
  if (props.viewName == 'Choosing')
    return <WordsManager/>
}


  class LearningSite extends React.Component {   
    state = {
      view: "Choosing"
    }

    changeView = (viewName) =>{
      this.setState({view: viewName});
  }

    render() {
      
      return (
        <div >
          <div> <Menu changeView = {this.changeView}/> </div>
          <div> <ReturnView viewName={this.state.view}/> </div>
        </div>
           
      );
    }
  } 

  ReactDOM.render(
    <LearningSite />,
    document.getElementById('root')
  );
  