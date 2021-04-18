import React from 'react';
import './manager.css';

class ListObject extends React.Component {

    render() {
          
      return (
        
        <div className = "yourListContainer">
        <div  className = {this.props.listNameClicked === this.props.listName ? "yourList yourListChoosen" : "yourList" }  
        onClick = {() => this.props.clickedList(this.props.listName)}> 
          {this.props.listName}
        </div>
        {this.props.isExitButton?
        <div 
        className = "removeButton removeListButton" 
        onClick = {() => this.props.removeList(this.props.listName)}> 
         X 
        </div>  
        :""
        }  
        </div>
       );
     }
  } 

export default ListObject