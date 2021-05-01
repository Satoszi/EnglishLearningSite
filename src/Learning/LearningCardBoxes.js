import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import './learning.css';
import Api from '../Api/Api.js';
import QuizMode from './QuizMode.js';
import {MODE} from '../constants.js';

class FlashBox extends React.Component {
  
  markBox(){ this.props.showBox(this.props.boxNumber) }

  render() {

    let high  = (100*this.props.wordsNumber)/this.props.sumWordsNumber
    if (this.props.sumWordsNumber < 1) high = 0
    let clickedClass = "cardBox"
    let green = this.props.boxNumber * 60
    let boxColor = "rgb(250, " + green + ", 0)"
    if (this.props.clicked == true) clickedClass = "cardBox cardBoxClicked"
    return (
      <div className={clickedClass} onClick={()=>this.markBox()} 
        style={{background  : "linear-gradient(to top, " + boxColor + " " + high + "%, white "+ high +"%)"}}> 
        <div className="cardBoxTitle"> Box {this.props.boxNumber + 1} </div>
        <div >
        Words left: {this.props.wordsNumber} <br/>
        Quiz time in: {this.props.testTime} h
        </div>

      </div>        
    );
  }
} 

class FlashBoxes extends React.Component {

    state = {
      clicked: [],
      timeUntilTestIsAvailable: [99,99,99,99,99] //Static Version
    };

  render() {
    
    let cardBoxes = []
    for (let i = 0; i < this.props.boxesNumber; i++){
      cardBoxes.push(<FlashBox key={i}   
                              showBox = {this.props.callBackSetFlashBox} 
                              boxNumber = {i}
                              clicked = {this.props.clicked[i]}
                              wordsNumber = {this.props.wordsNumberInFlashBox[i]}
                              sumWordsNumber = {this.props.wordsNumberInFlashBox.length > 0 ? this.props.wordsNumberInFlashBox.reduce(function(a, b) {
                                return a + b;
                              }):0}
                              testTime = {this.state.timeUntilTestIsAvailable[i]} />)
    }
    return (
      <div className="cardBoxes"> 
        {cardBoxes}
      </div>        
    );
  }
} 

class TranslatingList extends React.Component {
  
  state = {
    marked: false
  }

  markTranslating(){ this.setState({marked: !this.state.marked}) }

  render() {
    
    let markedClassEng = "wordInTranslatingEng"
    let markedClassPol = "wordInTranslatingPol"
    if (this.state.marked == true){
      markedClassEng = "wordInTranslatingEng englishTranslatingMarked"
      markedClassPol = "wordInTranslatingPol polishTranslatingMarked"
    }

    let wordsListToShow =
    <div onClick={()=>this.markTranslating()}  className="translatingBox">
      <div className={markedClassEng}> {this.props.english}</div> 
      <div className={markedClassPol}> {this.props.polish}</div>
    </div>
  
    return (
      <div> 
        {wordsListToShow}
      </div>        
    );
  }
} 

class LearnMode extends React.Component {

  render() {
    let translatingsListToShow = null
    if (this.props.wordsList !== null) 
      translatingsListToShow = this.props.wordsList.map(e => {return (
      <TranslatingList  key = {e.english} 
                        english = {e.english} 
                        polish = {e.polish} />
      )
  })
    return (
      <div> 
          <div className="testButtonsContainer">
            <div  className = "startTestButton" onClick = {() => this.props.changeModeToTesting_cb()}> Start Test </div>
          </div>
          <div className = "learningField">
              {translatingsListToShow}
         </div>
      </div>        
    );
  }
} 


  export class LearningCardBoxes extends React.Component {
  
      state = {
      mode:  MODE.learn,
      wordsListToLearn: [],
    }

    changeModeToTesting_cb = () => { this.setState({mode: MODE.quiz}) }
    changeModeToLearning_cb = () => { 
      this.setState({mode:  MODE.learn})
      setTimeout(function(){
        this.props.howManyWordsPerSet(this.props.suiteName);
        this.props.callBackSetFlashBox(0);}.bind(this),100); 
        
    }

    render() {

      let mode = null;
      if (this.state.mode ===  MODE.learn) 
            mode = <LearnMode 
                    wordsList = {this.props.wordsListToLearn}
                    changeModeToTesting_cb = {this.changeModeToTesting_cb}/>
      else  mode =  <QuizMode
                    wordsList = {this.props.wordsListToLearn}
                    changeModeToLearning_CallBack = {this.changeModeToLearning_cb} />
      
      return (
        <div> 
          <FlashBoxes 
          callBackSetFlashBox={this.props.callBackSetFlashBox}
          wordsNumberInFlashBox = {this.props.wordsNumberInFlashBox}
          clicked = {this.props.clicked}
          boxesNumber = {this.props.boxesNumber} />

          <div className="learningBox">
                

            {/*<div>*/} {mode} {/*<div>*/} 
             
          </div>
          
        </div>        
      );
    }
  } 

  export default LearningCardBoxes
