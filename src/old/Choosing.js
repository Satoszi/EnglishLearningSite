import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GetWords from '../Api/Api.js';
import SetsInChoosingBox from './SetsInChoosingBox'

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



export class ChoosingWords extends React.Component {

  state = {
    wordsList: [],
    wordsListToLearn: [],
    currentLearningSet: "nowy3",
  }

  async componentDidMount(){
    let getWords = new GetWords();
    getWords.getAp("http://bitex122.vot.pl/getuserwordsnotlearned.php?userid=9&from= " + 100 + "&to= " + 135, "wordsList", this.setStateFunc)
    //getWords.getAp("http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=0", "wordsListToLearn", this.setStateFunc)
    let userId = 9;
    this.setWordsListToLearn(userId, this.state.currentLearningSet)
  }

  setWordsListToLearn = (userId, setName) => {
    let getWords = new GetWords();
    getWords.wordsToLearnBySet(userId, setName, this.setWordsListToLearn_CallBack)
  }

  setWordsListToLearn_CallBack = (arr) => {
    this.setState({ wordsListToLearn: arr})
  }

  setStateFunc = (arr, stateVar) => {
    
    switch(stateVar) {
      case "wordsList":
        this.setState({ wordsList: arr})
        console.log("hello1")
        console.log(this.state.wordsList)
        break;
      case "wordsListToLearn":
        console.log("hello2")
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
  fetch( "http://bitex122.vot.pl/insertwordtoset.php?userid=" + userId + "&engword=" + english + "&setname=" + this.state.currentLearningSet);
  }


  moveElementBack = (english) =>{
    this.setState({ wordsList: this.state.wordsList.concat(this.state.wordsListToLearn.filter(function(element) { 
                    return element.english == english  })),

                    wordsListToLearn: this.state.wordsListToLearn.filter(function(element) { 
                    return element.english !== english  })              
  });
  fetch( "http://bitex122.vot.pl/deletefromstatus.php?userid=9&engword=" + english); //tu brakuje statusu ale to z lenistwa

  }

  changeLearningSetCallBack = (setName) =>{
    console.log("setname = " + setName)
    this.setState({currentLearningSet: setName})
    let userId = 9
    this.setWordsListToLearn(userId, setName)
  }

  render() {
    
    return (
      
      <div> 
         
        {/* <div className="choosingTitle"> ChoosingWords </div> */}
        <div style={{display:"flex"}}>  

          <div className="choosingBox" > 
            <div> Not choosed words  </div> <br/>
           
            <WordsList wordsList = {this.state.wordsList} moveElement={this.moveElement}/>
          </div> 

          <div className="choosingBox"> 
            <div> Choosed words  </div> <br/>
            <SetsInChoosingBox 
            changeLearningSetCallBack = {this.changeLearningSetCallBack} />
            Set: {this.state.currentLearningSet}
            <WordsList 
            wordsList = {this.state.wordsListToLearn} 
            moveElement={this.moveElementBack}/>
          </div> 

        </div>
      </div>        
     );
   }
} 

export default ChoosingWords
