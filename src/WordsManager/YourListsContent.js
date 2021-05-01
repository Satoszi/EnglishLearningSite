import React from 'react';
import './manager.css';
import WordObcjectsList from './WordObcjetsList'



export class YourListsContent extends React.Component {
    

    render() {
      return (
        <div className = "YourListsContent" > 
        <div className = "managerMiniBar" > Selected list: {this.props.currentLearningList} </div> 

        <div className = "listsContentWords">
        {this.props.wordsListToLearn.length >= 1 ? 
        <WordObcjectsList 
        wordsList = {this.props.wordsListToLearn} 
        moveElement={this.props.moveElementBack}/>
      :
      "list is empty"}
      </div>
        

        </div>     
       );
     }
  } 
  
export default YourListsContent