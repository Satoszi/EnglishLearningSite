import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import './learning.css';
import GetWords from '../Api/Api.js';
import LearningTest from './LearningTest.js';


class CardBox extends React.Component {
  

  markBox(){
    this.props.showBox(this.props.boxNumber)
  }

  render() {

    let clickedClass = "cardBox"
    let green = this.props.boxNumber * 60
    
    let boxColor = "rgb(250, " + green + ", 0)"
    if (this.props.clicked == true) clickedClass = "cardBox1"
    return (
      <div className={clickedClass} onClick={()=>this.markBox()} style={{background: boxColor}}> 
        <div className="cardBoxTitle"> Box {this.props.boxNumber + 1} </div>
        <div >
        Words left: {this.props.wordsNumber} <br/>
        Test time in: {this.props.testTime}
        </div>
      </div>        
    );
  }
} 

class CardBoxes extends React.Component {

  constructor(props) {
    super(props);
    // Nie wywołuj tutaj this.setState()!
    this.state = { clicked: [],
    timeUntilTestIsAvailable: [3,12,32,120,350] };
  }



  render() {
    
    let cardBoxes = []
    for (let i = 0; i < this.props.boxesNumber; i++){
      cardBoxes.push(<CardBox key={i}   
                              showBox = {this.props.callBackSetFlashBox} 
                              boxNumber = {i}
                              clicked = {this.props.clicked[i]}
                              wordsNumber = {this.props.wordsNumberInSet[i]}
                              testTime = {this.state.timeUntilTestIsAvailable[i]} />)
    }
    return (
      <div className="cardBoxes"> 
        {cardBoxes}
      </div>        
    );
  }
} 

class Translating extends React.Component {
  
  state = {
    marked: false
  }

  markTranslating(){
    this.setState({marked: !this.state.marked})
    console.log(this.state.marked)
  }

  render() {
    let wordsListToShow = null
    let markedClassEng = "polishTranslating"
    let markedClassPol = "englishTranslating"
    if (this.state.marked == true){
      markedClassEng = "polishTranslating englishTranslatingMarked"
      markedClassPol = "englishTranslating polishTranslatingMarked"
    }
    if (this.props.wordsListToShow !== null) 
    wordsListToShow = 
    <div onClick={()=>this.markTranslating()}  className="translating">
      <div className={markedClassPol} >{this.props.english}</div> 
      <div className={markedClassEng}>{this.props.polish}</div>
      </div>
  
    return (
      <div> 
        {wordsListToShow}
      </div>        
    );
  }
} 

class LearningList extends React.Component {

  render() {
    let wordsListToShow = null
    if (this.props.wordsListToShow !== null) 
    wordsListToShow = this.props.wordsListToShow.map(e => {return (
      <Translating key = {e.english} english = {e.english} polish = {e.polish} />
      )
  })
    return (
      <div> 
        {wordsListToShow}
      </div>        
    );
  }
} 


  export class LearningCardBoxes extends React.Component {
  
      state = {
      mode: "learning",
      wordsListToLearn: [],
      scrolled: window.pageYOffset
    }

/*  
    componentWillUnmount() {
      // If this component is unmounted, stop listening
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      const { lastScrollY } = this.state; 
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY) this.setState({ slide: '-48px' });
      else this.setState({ slide: '0px' });
      
      this.setState({ lastScrollY: currentScrollY });
      console.log(this.state.lastScrollY)
    };

    //do usuniecia setStateFunc2

    
    e
    
    setStateFunc2 = (arr, stateVar) => {
      switch(stateVar) {
        case "wordsList":
          this.setState({ wordsList: arr})
          break;
        case "wordsListToLearn":
          this.setState({ wordsListToLearn: arr})
          break;
      }
    }

    setStateFunc = (arr) => {
      this.setState({ wordsListToLearn: arr})
    }

    async getWordsToLearn(){
      let getWords = new GetWords();
      //getWords.getAp("http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=0", "wordsListToLearn", this.setStateFunc)
      getWords.wordsToLearnBySet(9, 0, this.props.setName, this.setStateFunc)
      window.addEventListener('scroll', this.handleScroll); //listening to scroll
    }

    async componentDidMount(){
      this.getWordsToLearn();
    }
    
    showSet = (boxNumber) => {
      let getWords = new GetWords();
      getWords.getAp("http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status="+ boxNumber, "wordsListToLearn", this.setStateFunc);
    }
    */
    changeModeToTesting = () => {
      this.setState({mode: "testing"})
    }

    changeModeToLearning_CallBack = () => {
      this.setState({mode: "learning"})
    }
    render() {

      let mode = null;
      if (this.state.mode === "learning") mode = <LearningList wordsListToShow = {this.props.wordsListToLearn}/>
      else mode =  <LearningTest 
                    wordsListToShow = {this.props.wordsListToLearn}
                    changeModeToLearning_CallBack = {this.changeModeToLearning_CallBack} />

      
      let hide = "navbar"
      if (this.state.lastScrollY > 500) hide = "navbar1"

      return (
        <div> 
          <CardBoxes 
          callBackSetFlashBox={this.props.callBackSetFlashBox}
          wordsNumberInSet = {this.props.wordsNumberInSet}
          clicked = {this.props.clicked}
          boxesNumber = {this.props.boxesNumber} />
          <div className="learningBox">

            <div className="learningCardBoxesMenu">

            
                <div  className = "startTestButton" onClick = {() => this.changeModeToTesting()}> Start Test
                <div id={hide}>
                  <div className = "startTestButton1"> Start Test </div>
                </div>
                </div>
            </div>  

            <div> {mode} </div>

          </div>
        </div>        
      );
    }
  } 

  export default LearningCardBoxes
