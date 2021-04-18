import React from "react";
import '../index.css';
import Api from '../Api/Api.js';
             
export class SetsInLearningSets extends React.Component{

    render(){
        let setsListToShow = this.props.sets.map(e => {return (
            <div onClick={()=>this.props.wordsToLearnBySetAndState(e)} 
            className = {this.props.listNameClicked === this.props.listName ? "yourList yourListChoosen" : "yourList" }
            key = {e}> {e} </div>)
            })  
        return(
            <div>{setsListToShow}</div>
            
        )
    }
}
               
export default SetsInLearningSets