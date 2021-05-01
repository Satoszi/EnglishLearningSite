import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LearningWords from './Learning/Learning'
import WordsManager from './WordsManager/WordsManager'
import Menu from './Menu'
  
function ReturnView (props){
  if (props.viewName == 'Learning')
    return <LearningWords/>;
  if (props.viewName == 'Choosing')
    return <WordsManager/>
  if (props.viewName == 'Dashboard')
    return <span style={{color: "red"}}> View is not implemented yet </span>
}

class LearningSite extends React.Component {   

  state = {
    view: "Choosing"
  }

  handleChangeView = (viewName) =>{
    this.setState({view: viewName});
  }

  render() { 

    return (
      <div >
        <div> <Menu handleChangeView = {this.handleChangeView}/> </div>
        <div> <ReturnView viewName={this.state.view}/> </div>
      </div>   
      );
    }
  } 


  ReactDOM.render(
    <LearningSite />,
    document.getElementById('root')
  );
  