import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import GetWords from '../Api/Api.js';
import CompleteListsContent from './CompleteListsContent'
import CompleteListsManager from './CompleteListsManager'
import YourListsContent from './YourListsContent'
import YourListsManager from './YourListsManager'



export class WordsManager extends React.Component {
    state = {
        wordsList: [],
        wordsListToLearn: [],
        currentLearningList: null,
      }

      setCurrentList_CallBack = (arr, listName) => {
        this.setState({ wordsListToLearn: arr})
        this.setState({ currentLearningList: listName})
      }

        //TODO clean code
    async componentDidMount(){
        let getWords = new GetWords();
        getWords.getAp("http://bitex122.vot.pl/getuserwordsnotlearned.php?userid=9&from= " + 100 + "&to= " + 215, "wordsList", this.setStateFunc)
        //getWords.getAp("http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=0", "wordsListToLearn", this.setStateFunc)
        let userId = 9;
    }

    //Todo clean code
    setStateFunc = (arr, stateVar) => {
        switch(stateVar) {
        case "wordsList":
            this.setState({ wordsList: arr})
            break;
        case "wordsListToLearn":
            this.setState({ wordsListToLearn: arr})
            break;
        }
    }
    
    moveElement = (english) =>{
        this.setState({ wordsListToLearn: this.state.wordsListToLearn.concat(this.state.wordsList.filter(function(element) { 
                        return element.english == english  })),
    
                        wordsList: this.state.wordsList.filter(function(element) { 
                        return element.english !== english  })       
      });
      //fetch( "http://bitex122.vot.pl/insertwordforuser.php?userid=9&engword=" + english + "&status=0");
      let userId = 9
      fetch( "http://bitex122.vot.pl/insertwordtoset.php?userid=" + userId + "&engword=" + english + "&setname=" + this.state.currentLearningList);
      }

    
      moveElementBack = (english) =>{
        this.setState({ wordsList: this.state.wordsList.concat(this.state.wordsListToLearn.filter(function(element) { 
                        return element.english == english  })),
    
                        wordsListToLearn: this.state.wordsListToLearn.filter(function(element) { 
                        return element.english !== english  })              
      });
      fetch( "http://bitex122.vot.pl/deletefromstatus.php?userid=9&engword=" + english); //tu brakuje statusu ale to z lenistwa
    
      }

  render() {

    return (
      
      <div className = "Manager"> 
        <CompleteListsManager />

        <YourListsManager 
        setCurrentList_CallBack = {this.setCurrentList_CallBack}  />
        <CompleteListsContent 
        wordsList = {this.state.wordsList}
        moveElement = {this.moveElement}
        />

        <YourListsContent 
        wordsListToLearn = {this.state.wordsListToLearn} 
        currentLearningList = {this.state.currentLearningList}
        moveElementBack = {this.moveElementBack}/>
      </div>        
     );
   }
} 

export default WordsManager
