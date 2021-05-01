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
    this.setState({sets: ["C2 Words","C1 Words","B2 Words","B1 Words","A2 Words","A1 Words","Life vocab","IT vocab","Another List",]})
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
        <span style={{color: "red"}}> View is not implemented yet </span>
        {setsListToShow}

         </div>     
       );
     }
  } 
  
export default CompleteListsManager