import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './learning.css';

let boxesNumber = 5

class CardBox extends React.Component {
  

  markBox(){
    this.props.showBox(this.props.boxNumber)
  }

  render() {
    let clickedClass = "cardBox"
    let yellow2 = this.props.index * 60
    
    let yellow = "rgb(250, " + yellow2 + ", 0)"
    if (this.props.clicked == true) clickedClass = "cardBox cardBox1"
    return (
      <div className={clickedClass} onClick={()=>this.markBox()} style={{background: yellow}}> 
        <div className="cardBoxTitle"> Box {this.props.boxNumber + 1} </div>
        <div className="cardBoxDetails">
        Words left: {this.props.wordNumber} <br/>
        Test time in: {this.props.testTime}h
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
    wordNumber:[31,3,4,0,0],
    testTime: [3,12,32,120,350] };
  }

  componentDidMount(){
    
    let clickedArr = []
    clickedArr.push(true)
    for (let i = 1; i < boxesNumber; i++){
      clickedArr.push(false)
    }
    this.setState({clicked: clickedArr})
  }

  showBox = (boxNumber) => {
    //console.log("KKKKKKKKK " + boxNumber)
    let clickedArr = this.state.clicked
    for (let i = 0; i < boxesNumber; i++){
      clickedArr[i] = false
    }
    clickedArr[boxNumber] = true
    this.setState({clicked: clickedArr})
    this.props.showBox(boxNumber)
  }

  render() {
    let cardBoxes = []
    for (let i = 0; i < boxesNumber; i++){
      cardBoxes.push(<CardBox key={i} 
                              index = {i}
                              showBox = {this.showBox} 
                              boxNumber = {i}
                              clicked = {this.state.clicked[i]}
                              wordNumber = {this.state.wordNumber[i]}
                              testTime = {this.state.testTime[i]} />)
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
      wordsListToLearn: [],
      scrolled: window.pageYOffset
    }

    componentWillMount() {
      // When this component mounts, begin listening for scroll changes
      window.addEventListener('scroll', this.handleScroll);
    }
  
    componentWillUnmount() {
      // If this component is unmounted, stop listening
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      const { lastScrollY } = this.state; 
      const currentScrollY = window.scrollY;
  
  
      if (currentScrollY > lastScrollY) {
        this.setState({ slide: '-48px' });
      } else {
        this.setState({ slide: '0px' });
      }
      this.setState({ lastScrollY: currentScrollY });
      console.log(this.state.lastScrollY)
    };

    async getApiToLearn(status){
  
      const response = await fetch( "http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=" + status);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push({english: key, polish: data[key] })
      }
  
      this.setState({ wordsListToLearn: arr})
    }
  
    async componentDidMount(){
      this.getApiToLearn(0)
    }

    showBox = (boxNumber) => {
      //console.log("HHHHHHHHHHR " + boxNumber)
      this.getApiToLearn(boxNumber)
    }

    render() {

      let hide = "navbar"
      if (this.state.lastScrollY > 500) hide = "navbar1"
      return (
        <div  > 
          <CardBoxes showBox={this.showBox}/>
          <div className="learningBox">

            <div className="learningCardBoxesMenu">

            
                <div  className = "startTestButton"> Start Test 
                <div id={hide}>
                  <div className = "startTestButton1"> Start Test </div>
                </div>
                </div>
            </div>

            

            <div><LearningList wordsListToShow = {this.state.wordsListToLearn}/> </div>

          </div>
        </div>        
      );
    }
  } 

  export default LearningCardBoxes
