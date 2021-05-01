import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../Api/Api.js'
import '../index.css';
import './learning.css';

class Translating extends React.Component {
  
    state = {
      marked: false,
      ifKnown: null
    }
  
    markTranslating(){
      this.setState({marked: !this.state.marked})
    }
  
    markIfKnown(ifKnown){
        if (ifKnown === 0) this.props.popNotKnownWord(this.props.english)
        if (ifKnown === 1) this.props.appendKnownWord(this.props.english)
        this.setState({ifKnown: ifKnown})
      }

    render() {

        let knownWordClass = "knownWordClass";
        let notKnownWordClass = "notKnownWordClass";
        if (this.state.ifKnown === 0) notKnownWordClass = "notKnownWordClass notKnownWordClassMarked";
        if (this.state.ifKnown === 1) knownWordClass = "knownWordClass knownWordClassMarked";

        let wordsListToShow = null
        let markedClassEng = "polishTranslating"
        let markedClassPol = "englishTranslating"
        if (this.state.marked == true){
            markedClassEng = "polishTranslating englishTranslatingMarked"
            markedClassPol = "englishTranslating polishTranslatingMarked"
        }

        if (this.props.wordsList !== null) 
        wordsListToShow = 
        <div className="testChecking">
            <div onClick={()=>this.markTranslating()}  className="testTranslating">
                <div className={markedClassPol} >{this.props.english}</div> 
                <div className={markedClassEng}>{this.props.polish}</div>
            </div> 
                <div className={knownWordClass} onClick = {() => this.markIfKnown(1)} >Znam</div>
                <div className={notKnownWordClass} onClick = {() => this.markIfKnown(0)} > Nie znam </div>
        </div>
        
         return (
        <div> 
          {wordsListToShow}
        </div>        
      );
    }
  } 
  
  export class QuizMode extends React.Component {
    
    state = {
        isWordKnownList: []
    }

    appendKnownWord = (knownWord) => {
        if (!this.state.isWordKnownList.includes(knownWord))
        this.setState({ isWordKnownList: this.state.isWordKnownList.concat(knownWord) });
    }

    popNotKnownWord = (knownWord) => {
        this.setState({isWordKnownList: this.state.isWordKnownList.filter(function(element) { 
        return element !== knownWord  }) });
    }


    moveWordsToProperFlashBox = () => {
      const api = new Api()
      api.moveWordsToProperFlashBox(this.state.isWordKnownList)
    }

    saveTest = () => {
        this.moveWordsToProperFlashBox()
        this.props.changeModeToLearning_CallBack();
    }

    cancelTest = () => {
      this.props.changeModeToLearning_CallBack();
  }

    render() {
      let wordsListToShow = null
      if (this.props.wordsList !== null) 
      wordsListToShow = this.props.wordsList.map(e => {return (
            <Translating 
            key = {e.english} 
            english = {e.english} 
            polish = {e.polish} 
            appendKnownWord = {this.appendKnownWord}
            popNotKnownWord = {this.popNotKnownWord} />
        )
    })
      return (
        <div> 
          <div className="testButtonsContainer">
          <div  className = "startTestButton" 
                onClick = {() => this.saveTest()}> 
                Save 
          </div>
          <div  className = "startTestButton cancelButton" 
                onClick = {() => this.cancelTest()}> 
                Cancel 
          </div>
          </div>
          {wordsListToShow}
        </div>        
      );
    }
  } 

  export default QuizMode