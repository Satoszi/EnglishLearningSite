import React from 'react';
import './manager.css';
import GetWords from '../Api/Api.js';
import ListObject from './ListObject'
import Popup from './AddNewListPopup';



class AddYourList extends React.Component {

  state = {
    isClicked: false
  }
  showCreateListPopup = () => {
      document.getElementById("createListPopup").style.visibility = "visible";

  }
  hideCreateListPopup = () => {
    setTimeout(function(){document.getElementById("createListPopup").style.visibility = "hidden";}, 1);
}

    render() {
          
      return (
        <div className = "yourListContainer">
        <div onClick = {() => this.showCreateListPopup()}className = "yourList addNew"> 
          Add new +
          
        </div>       
        <div>
          <Popup 
          hideCreateListPopup = {this.hideCreateListPopup}
          createList = {this.props.createList}
          removeList = {this.props.removeList}/>
        </div> 
        </div>
       );
     }
  } 



export class YourListsManager extends React.Component {

  state = {
    sets: [],
    currentList: null,
    listNameClicked: null
  }

  clickedList = (listName) => {
    this.setCurrentList(listName)
    this.setState({listNameClicked: listName})
  }

  CallBackSets = (arr) => { this.setState({sets: arr});}

  async componentDidMount(){
      let getLists = new GetWords();
      let userId = 9
      getLists.getSets(userId, this.CallBackSets)
  }

  setWordsListToLearn_CallBack = (arr) => {
    this.props.setCurrentList_CallBack(arr, this.state.currentList)
  }

  setCurrentList = (listName) => {
    let getWords = new GetWords();
    let userId = 9;
    this.setState({currentList: listName})
    getWords.wordsToLearnBySet(userId, listName, this.setWordsListToLearn_CallBack)
  }

  createList = (listName) => {
    let createList = new GetWords();
    let userId = 9;
    createList.newSet(userId, listName)
    // do przeniesienia do popupu
    //let id = "SetInput"
    //document.getElementById(id).value = ""
    this.setState({sets: this.state.sets.concat(listName)})
   }

   removeList = (listName) => {
    let createList = new GetWords();
    let userId = 9;
    //removeList.newSet(userId, listName)
    console.log("removing " + listName)
    //this.setState({sets: this.state.sets.   concat?  (listName)})
   }

    render() {
      

        let setsListToShow = this.state.sets.map(setName => {return (
          <div 
              key = {setName}>
              <ListObject 
              listName = {setName}
              listNameClicked = {this.state.listNameClicked}
              clickedList = {this.clickedList}
              removeList = {this.removeList}/>
          </div>)
        })  
      


      return (
        <div className = "YourListsManager"> 
            <div className = "managerMiniBar" >Your Lists </div>
            <AddYourList createList = {this.createList}/>
            {setsListToShow}

        </div>     
       );
     }
  } 
  
export default YourListsManager