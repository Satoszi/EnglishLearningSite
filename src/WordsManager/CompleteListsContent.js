import React from 'react';
import './manager.css';
import Api from '../Api/Api.js';
import WordObcjectsList from './WordObcjetsList'


export class CompleteListsContent extends React.Component {


    render() {
      
      return (
        <div className = "CompleteListsContent" > 
        <div className = "managerMiniBar" > Complete Lists Content </div>
        
        <div className = "listsContentWords">
        {this.props.wordsList.length >= 1 ? 
        <WordObcjectsList 
        wordsList = {this.props.wordsList} 
        moveElement={this.props.moveElement}/>
      :
      "list is empty"}
      </div>

        
         </div>     
       );
     }
  } 
  
export default CompleteListsContent