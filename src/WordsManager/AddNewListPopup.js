import React from 'react';
import './manager.css';
import Api from '../Api/Api.js';


export class Popup extends React.Component{

    state 
    createList(){
        if (document.getElementById("listNameInput").value === ""){
            alert("Field empy! Put list name or close window.")
        }else {
            this.props.createList(document.getElementById("listNameInput").value)
        }
        document.getElementById("listNameInput").value = ""
    }

    render(){

        return (
            <div 
            className = "popup" 
            id="createListPopup"> 
                <input 
                className = "createListInput" 
                placeholder="List name"  
                id = "listNameInput"></input>

                <div className = "createButtonContainer">

                <div 
                className = "createButton"
                
                onClick = {() => this.createList()} > 
                Create 
                </div>

                <div 
                className = "exitButton" 
                onClick = {() => this.props.hideCreateListPopup()}> 
                 X 
                </div>


                
                </div>
            </div>
        )
    }
}

export default Popup


