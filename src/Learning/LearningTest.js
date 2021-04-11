import React from 'react';
import ReactDOM from 'react-dom';
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
        console.log("wywoluje")
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

        if (this.props.wordsListToShow !== null) 
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
  
  export class LearningTest extends React.Component {
    
    state = {
        ifKnownWordArr: []
    }

    appendKnownWord = (knownWord) => {
        if (!this.state.ifKnownWordArr.includes(knownWord))
        this.setState({ ifKnownWordArr: this.state.ifKnownWordArr.concat(knownWord) });
        console.log("appendKnownWord = " + this.state.ifKnownWordArr)
    }

    popNotKnownWord = (knownWord) => {
        this.setState({ifKnownWordArr: this.state.ifKnownWordArr.filter(function(element) { 
        return element !== knownWord  }) });
        console.log("popNotKnownWord = " + this.state.ifKnownWordArr)
    }

    moveWordsToProperFlashBoxInDatabase = () => {

        let userId = 9;
        let words = [];
        for (var key in this.state.ifKnownWordArr){
          words[key.toString()] = this.state.ifKnownWordArr[key]
        }

        let data = {'words': words, 'userid': 9};

        let url = "http://bitex122.vot.pl/moveWordsToProperFlashBox.php"

        fetch(url, {
            method: "post", 
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
          })
          //.then(res => {
          //  console.log("Request complete! response:", res);
          //}).catch((error) => {
          //  console.error('Error:', error);
          //});

    }

    saveTest = () => {
        this.moveWordsToProperFlashBoxInDatabase()
        this.props.changeModeToLearning_CallBack();
    }

    render() {
      let wordsListToShow = null
      if (this.props.wordsListToShow !== null) 
      wordsListToShow = this.props.wordsListToShow.map(e => {return (
            
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
          <div  className = "startTestButton" 
                onClick = {() => this.saveTest()}> Stop Test </div>
          {wordsListToShow}
        </div>        
      );
    }
  } 

  export default LearningTest