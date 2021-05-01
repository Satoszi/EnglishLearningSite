import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import './learning.css';
import LearningCardBoxes from './LearningCardBoxes'
import Api from '../Api/Api.js';
import ListObject from '../WordsManager/ListObject'

let boxesNumber = 5;

  export class LearningWords extends React.Component {
    
    state = { 
      wordsListToLearn: [],
      wordsNumberInFlashBox:[],
      suites: [],
      flashBoxesFocusArr: [],
      currentSuite: null,
    }

    /*a*/ componentDidMount(){
      this.GetSuitesList()
    }

    setWordsNumberInSet_cb = (wordsList) => { this.setState({ wordsNumberInFlashBox: wordsList}) }
    setWordsListToLearn_cb = (wordsList) => { this.setState({ wordsListToLearn: wordsList}) }
    handleGetWordsList_cb = (suitesList) => {
      this.setState({suites: suitesList,
                     currentSuite: suitesList[0]});
      this.setCurrentSet(suitesList[0]);
   }

    /*a*/ howManyWordsPerSet = (suiteName) =>{
      
      let getWords = new Api();
      getWords.howManyWordsPerSet(suiteName, this.setWordsNumberInSet_cb)
    }

    /*a*/ wordsToLearnBySetAndState(suiteName, state){
      let getWords = new Api();
      getWords.wordsToLearnBySetAndState(state, suiteName, this.setWordsListToLearn_cb)
    }

    // z malej
    GetSuitesList(){
      let getSuitesList = new Api();
      getSuitesList.getSets(this.handleGetWordsList_cb)
    }

    setCurrentSet = (suiteName) => {
      this.setState({suiteName: suiteName})
      this.howManyWordsPerSet(suiteName) 
      this.setCurrentFlashBoxAsync(0, suiteName);
    }

    setCurrentFlashBoxAsync = (boxNumber, currentSuite = this.state.currentSuite) => {
      this.wordsToLearnBySetAndState(currentSuite, boxNumber)
      let flashBoxesFocusArr = this.state.flashBoxesFocusArr
      flashBoxesFocusArr.fill(false)[boxNumber] = true
      this.setState({flashBoxesFocusArr: flashBoxesFocusArr})
    }

  handleSetCurrentSuite = (suiteName) => {
    this.setCurrentSet(suiteName);
    this.setState({currentSuite: suiteName})
  }

    render() {

      let suitesList = this.state.suites.map(suiteName => {return (
        <div 
            key = {suiteName}>
            <ListObject 
            listName = {suiteName}
            listNameClicked = {this.state.currentSuite}
            clickedList = {this.handleSetCurrentSuite}
            removeList = {this.removeList}
            isExitButton = {false}/>
        </div>)
      })

      return (
        <div> 
          <span style={{color: "red", fontSize: "14px"}}> View is not ready yet </span>
            <div style={{display:"flex"}}>
                
                <div className="sets"> 
                
                {suitesList} 
                </div>

                <div className="learningDiv">
                  <LearningCardBoxes 
                  callBackSetFlashBox = {this.setCurrentFlashBoxAsync}
                  howManyWordsPerSet = {this.howManyWordsPerSet}
                  suiteName = {this.state.currentSuite}
                  wordsListToLearn = {this.state.wordsListToLearn}
                  wordsNumberInFlashBox = {this.state.wordsNumberInFlashBox}
                  clicked = {this.state.flashBoxesFocusArr}
                  boxesNumber = {boxesNumber} /> 
                </div>

            </div>
        </div>        
      );
    }
  } 

  export default LearningWords
