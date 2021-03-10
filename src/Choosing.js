import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class WordsListToLearn extends React.Component {

  render() {
    let wordsListToShow = null
    if (this.props.wordsListToLearn !== null) 
    wordsListToShow = this.props.wordsListToLearn.map(e => {return (
    <div onClick={()=>this.props.moveElementBack(e.english)} className="translating" key = {e.english}>
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
  

  async getApi(){
    //const random = Math.floor(Math.random() * 100) + 100; 
    const response = await fetch( "http://bitex122.vot.pl/getuserwordsnotlearned.php?userid=9&from= " + 100 + "&to= " + 135);
    const data = await response.json();
  
    const arr = []
    for (var key in data){
      arr.push({english: key, polish: data[key] })
    }
      //this.state.wordsListToLearn.includes(element)
      
    this.setState({ wordsList: arr})
  }

  async getApiToLearn(){
  
    const response = await fetch( "http://bitex122.vot.pl/getuserwordsbystatus.php?userid=9&status=0");
    const data = await response.json();
  
    const arr = []
    for (var key in data){
      arr.push({english: key, polish: data[key] })
    }

    this.setState({ wordsListToLearn: arr})
  }

  async componentDidMount(){

    this.getApiToLearn()
    this.getApi()
    
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
        <WordsListToLearn wordsListToLearn = {this.state.wordsListToLearn} moveElementBack ={this.moveElementBack} />

        </div> 


        </div>
      </div>        
     );
   }
} 

export default ChoosingWords
