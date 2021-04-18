import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import GetWords from '../Api/Api.js';
import CompleteListsContent from './CompleteListsContent'
import CompleteListsManager from './CompleteListsManager'
import YourListsContent from './YourListsContent'
import YourListsManager from './YourListsManager'

function addWordToSuite(wordsListToLearn, wordsList, english){
  return (
    wordsListToLearn.concat(wordsList.filter(function(element) { 
    return element.english == english  }))
  )
}

function removeWordFromSuite(wordsListToLearn, english){
  return (
    wordsListToLearn.filter(function(element) { 
      return element.english !== english  }) 
  )
}


export class WordsManager extends React.Component {

  state = {
    wordsList: [],
    wordsListToLearn: [],
    currentLearningList: null,
  }

  async componentDidMount(){
    let getWords = new GetWords();
    getWords.getAllWords(this.getWordsList_cb)
  }

  getWordsList_cb = (arr) => { this.setState({ wordsList: arr}) }

  setCurrentList_CallBack = (arr, listName) => {
    this.setState({ wordsListToLearn: arr})
    this.setState({ currentLearningList: listName})
  }
  
  moveElement = (english) =>{
    this.setState({ wordsListToLearn: addWordToSuite(this.state.wordsListToLearn,this.state.wordsList,english),
                    wordsList: removeWordFromSuite(this.state.wordsList,english)
                  });
    let getWords = new GetWords();
    getWords.addWordToSuite(english, this.state.currentLearningList)
  }

  moveElementBack = (english) =>{
    this.setState({ wordsList: addWordToSuite(this.state.wordsList,this.state.wordsListToLearn,english),
                    wordsListToLearn: removeWordFromSuite(this.state.wordsListToLearn,english)
                  });
    let getWords = new GetWords();
    getWords.removeWordFromSuite(english)
  }

  render() {

    return (
      
      <div className = "Manager"> 

        <CompleteListsManager/>

        <YourListsManager 
        setCurrentList_CallBack = {this.setCurrentList_CallBack}  />

        <CompleteListsContent 
        wordsList = {this.state.wordsList}
        moveElement = {this.moveElement}/>

        <YourListsContent 
        wordsListToLearn = {this.state.wordsListToLearn} 
        currentLearningList = {this.state.currentLearningList}
        moveElementBack = {this.moveElementBack}/>

      </div>        
     );
   }
} 

export default WordsManager
