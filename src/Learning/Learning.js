import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import './learning.css';
import LearningCardBoxes from './LearningCardBoxes'
import SetsInLearningSets from './SetInLearningSets'
import GetWords from '../Api/Api.js';
import ListObject from '../WordsManager/ListObject'

let boxesNumber = 5;

  export class LearningWords extends React.Component {
    
    state = { 
      setName: "",
      wordsListToLearn: [],
      wordsNumberInSet:[],
      sets: [],
      clicked: [],
      listNameClicked: null,
    }

    //*********** Troche tu nagmatwane bo trzeba sie zastanowić czy te async są potrzebne
    // jesli są to muszą być wywołane z innej funkcji

    setWordsNumberInSet = (arr) => {
      this.setState({ wordsNumberInSet: arr})
    }
    setWordsListToLearn = (arr) => {
      this.setState({ wordsListToLearn: arr})
    }

    /*async*/ howManyWordsPerSet(userId, setName){
      let getWords = new GetWords();
      getWords.howManyWordsPerSet(userId, setName, this.setWordsNumberInSet)
    }

    /*async*/ wordsToLearnBySetAndState(setName1, state){
      let getWords = new GetWords();
      getWords.wordsToLearnBySetAndState(9, state, setName1, this.setWordsListToLearn)
    }
    setCurrentSetAsync = (setName1) => {
      console.log("set changed to " + setName1)
      this.setState({setName: setName1})
      this.wordsToLearnBySetAndState(setName1, 0)
      let userId = 9;
      this.howManyWordsPerSet(userId, setName1) 
      this.callBackSetFlashBox(0);

    }
    setCurrentFlashBoxAsync = (boxNumber) => {
      this.wordsToLearnBySetAndState(this.state.setName, boxNumber)
      this.callBackSetFlashBox(boxNumber)
    }

    CallBackSetsList = (arr) => {
      this.setState({sets: arr,
                     setName: arr[0]});
      this.setCurrentSetAsync(arr[0]);
      
  }


  callBackSetFlashBox = (boxNumber) => {

    let clickedArr = this.state.clicked
    for (let i = 0; i < boxesNumber; i++){
      clickedArr[i] = false
    }
    clickedArr[boxNumber] = true
    this.setState({clicked: clickedArr})

  }

  async componentDidMount(){
      let getSetsList = new GetWords();
      let userId = 9
      getSetsList.getSets(userId, this.CallBackSetsList)

      let clickedArr = []
      clickedArr.push(true)
      for (let i = 0; i < boxesNumber; i++){
        clickedArr.push(false)
      }
      this.setState({clicked: clickedArr})
  }

  clickedList = (listName) => {
    this.setCurrentSetAsync(listName);
    this.setState({listNameClicked: listName})
  }

    render() {

      let setsListToShow = this.state.sets.map(setName => {return (
        <div 
            key = {setName}>
            <ListObject 
            listName = {setName}
            listNameClicked = {this.state.listNameClicked}
            clickedList = {this.clickedList}
            removeList = {this.removeList}
            isExitButton = {false}/>
        </div>)
      })

      return (
        <div> 
            {/* <div className="choosingTitle"> Learning words </div> */}
            <div style={{display:"flex"}}>
                <div className="sets">
                {setsListToShow}
                </div>
                 <div className="learningDiv">
                  <LearningCardBoxes 
    
                  callBackSetFlashBox = {this.setCurrentFlashBoxAsync}
                  wordsListToLearn = {this.state.wordsListToLearn}
                  wordsNumberInSet = {this.state.wordsNumberInSet}
                  clicked = {this.state.clicked}
                  boxesNumber = {boxesNumber} /> 
                  
                </div>

            </div>
        </div>        
      );
    }
  } 

  export default LearningWords
