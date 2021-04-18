import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import './learning.css';
import LearningCardBoxes from './LearningCardBoxes'
import GetWords from '../Api/Api.js';
import ListObject from '../WordsManager/ListObject'

let boxesNumber = 5;

  export class LearningWords extends React.Component {
    
    state = { 
      setName: null,
      wordsListToLearn: [],
      wordsNumberInSet:[],
      sets: [],
      flashBoxesFocusArr: [],
      setNameClicked: null,
    }

    /*a*/ componentDidMount(){
      this.GetSetsList()
    }

    setWordsNumberInSet_cb = (wordsList) => { this.setState({ wordsNumberInSet: wordsList}) }
    setWordsListToLearn_cb = (wordsList) => { this.setState({ wordsListToLearn: wordsList}) }
    handleGetWordsList_cb = (setsList) => {
      this.setState({sets: setsList,
                     setName: setsList[0]});
      this.setCurrentSet(setsList[0]);
   }

    /*a*/ howManyWordsPerSet(userId, setName){
      let getWords = new GetWords();
      userId = 9
      getWords.howManyWordsPerSet(userId, setName, this.setWordsNumberInSet_cb)
    }

    /*a*/ wordsToLearnBySetAndState(setName1, state){
      let getWords = new GetWords();
      let userId = 9
      getWords.wordsToLearnBySetAndState(userId, state, setName1, this.setWordsListToLearn_cb)
    }

    GetSetsList(){
      let getSetsList = new GetWords();
      let userId = 9
      getSetsList.getSets(userId, this.handleGetWordsList_cb)
    }

    setCurrentSet = (setName) => {
      this.setState({setName: setName})
      let userId = 9;
      this.howManyWordsPerSet(userId, setName) 
      this.setCurrentFlashBoxAsync(0);
    }

    setCurrentFlashBoxAsync = (boxNumber) => {
      this.wordsToLearnBySetAndState(this.state.setName, boxNumber)
      let flashBoxesFocusArr = this.state.flashBoxesFocusArr
      flashBoxesFocusArr.fill(false)[boxNumber] = true
      this.setState({flashBoxesFocusArr: flashBoxesFocusArr})
    }


  handleSetfocus = (setName) => {
    this.setCurrentSet(setName);
    this.setState({setNameClicked: setName})
  }

    render() {

      let setsList = this.state.sets.map(setName => {return (
        <div 
            key = {setName}>
            <ListObject 
            listName = {setName}
            listNameClicked = {this.state.setNameClicked}
            clickedList = {this.handleSetfocus}
            removeList = {this.removeList}
            isExitButton = {false}/>
        </div>)
      })

      return (
        <div> 
            <div style={{display:"flex"}}>
                <div className="sets"> {setsList} </div>

                <div className="learningDiv">
                  <LearningCardBoxes 
                  callBackSetFlashBox = {this.setCurrentFlashBoxAsync}
                  wordsListToLearn = {this.state.wordsListToLearn}
                  wordsNumberInSet = {this.state.wordsNumberInSet}
                  clicked = {this.state.flashBoxesFocusArr}
                  boxesNumber = {boxesNumber} /> 
                </div>

            </div>
        </div>        
      );
    }
  } 

  export default LearningWords
