import React from 'react';
import './manager.css';
import Api from '../Api/Api.js';
import ListObject from './ListObject'

export class CompleteListsManager extends React.Component {
  
  state = {
    sets: [],
    currentList: null,
    listNameClicked: null
  }

  clickedList = (listName) => {
    this.setState({listNameClicked: listName})
  }

  //for now
  async componentDidMount(){
    this.setState({sets: ["L1","L2","L3","L4","L5","L6","L7","L8",]})
}
  //TODO
setCurrentList = (listName) => {
  let getWords = new Api();
  let userId = 9;
  this.setState({currentList: listName})
  // TODO
  //getWords.wordsToLearnBySet(userId, listName, this.setWordsListToLearn_CallBack)
}

    render() {
      
      let setsListToShow = this.state.sets.map(setName => {return (
        <div 
            onClick={() => this.setCurrentList(setName)} 
            key = {setName}>
            <ListObject listName = {setName}
            listNameClicked = {this.state.listNameClicked}
            clickedList = {this.clickedList}/>
        </div>)
      })  

      return (
        <div className = "CompleteListsManager"> 
        <div className = "managerMiniBar" > Complete Lists Manager </div>
        
        {setsListToShow}

         </div>     
       );
     }
  } 
  
export default CompleteListsManager