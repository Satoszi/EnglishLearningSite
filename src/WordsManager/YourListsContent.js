import React from 'react';
import './manager.css';

class WordsList extends React.Component {

  render() {
    let wordsListToShow = 
          this.props.wordsList.map(e => {return (
          <div onClick={()=>this.props.moveElement(e.english)} className="translating" key = {e.english}>
          <div className="englishTranslating" >{e.english}</div> 
          <div className="polishTranslating">{e.polish}</div>
          </div>)
          })  

    return (
      <div> 
          {wordsListToShow}
      </div>        
    );
  }
} 

export class YourListsContent extends React.Component {


    render() {
      
      return (
        <div className = "YourListsContent" > 
        <div className = "managerMiniBar" > List 2 </div> 

        <WordsList wordsList = {this.state.wordsList} moveElement={this.moveElement}/>
        
        </div>     
       );
     }
  } 
  
export default YourListsContent