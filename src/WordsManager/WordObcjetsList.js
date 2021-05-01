import React from 'react';
import './manager.css';

class WordObcjectsList extends React.Component {

    render() {
      let wordsListToShow = 
            this.props.wordsList.map(e => {return (
            <div  onClick={()=>this.props.moveElement(e.english)} 
                  className="englishWord" 
                  key = {e.english}>
            {e.english}
            
            </div>) 
            })  
  
      return (
        <div> 
            {wordsListToShow}
        </div>        
      );
    }
  } 

  export default WordObcjectsList