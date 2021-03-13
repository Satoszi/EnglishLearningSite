import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class WordsList extends React.Component {

  render() {
    let wordsListToShow = null
    if (this.props.wordsList !== null) 
    wordsListToShow = 
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
    wordsListToLearn: []
  }
  

  async getAp(url, stateVar){
    const response = await fetch( url);
    const data = await response.json();
  
    const arr = []
    for (var key in data){
      arr.push({english: key, polish: data[key] })
    }
    switch(stateVar) {
      case "wordsList":
        this.setState({ wordsList: arr})
        break;
      case "wordsListToLearn":
        this.setState({ wordsListToLearn: arr})
        break;
    }
    
  }

  async componentDidMount(){
    this.getAp("http://bitex122.vot.pl/getuserwordsnotlearned.php?userid=9&from= " + 100 + "&to= " + 135, "wordsList")
    this.getAp("http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=0", "wordsListToLearn")
  }

moveElement = (english) =>{
    this.setState({ wordsListToLearn: this.state.wordsListToLearn.concat(this.state.wordsList.filter(function(element) { 
                    return element.english == english  })),

                    wordsList: this.state.wordsList.filter(function(element) { 
                    return element.english !== english  })       
});
fetch( "http://bitex122.vot.pl/insertwordforuser.php?userid=9&engword=" + english + "&status=0");

}


moveElementBack = (english) =>{
  this.setState({ wordsList: this.state.wordsList.concat(this.state.wordsListToLearn.filter(function(element) { 
                  return element.english == english  })),

                  wordsListToLearn: this.state.wordsListToLearn.filter(function(element) { 
                  return element.english !== english  })              
});
fetch( "http://bitex122.vot.pl/deletefromstatus.php?userid=9&engword=" + english); //tu brakuje statusu ale to z lenistwa

}

  render() {
    return (
      <div> 
         
        {/* <div className="choosingTitle"> ChoosingWords </div> */}
        <div style={{display:"flex"}}>  
        <div className="choosingBox" > 
        <div> Not choosed words  </div>
        <br/>
        <WordsList wordsList = {this.state.wordsList} moveElement={this.moveElement}/>
        </div> 

        <div className="choosingBox"> 
        <div> Choosed words  </div>
        <br/>
        <WordsList wordsList = {this.state.wordsListToLearn} moveElement={this.moveElementBack}/>

        </div> 


        </div>
      </div>        
     );
   }
} 

export default ChoosingWords
