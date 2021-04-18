import React from "react";
import './index.css';
import Api from '../Api/Api.js';



export class SetsInChoosingBox extends React.Component{

    state = {
        sets: []
    }

    CreateSet = (userId, setName) => {
        let createSet = new Api();
        let id = "SetInput"
        setName = document.getElementById(id).value;
        createSet.newSet(userId, setName)
        document.getElementById(id).value = ""
        this.setState({sets: this.state.sets.concat(setName)})
    }

    CallBackSets = (arr) => {
        this.setState({sets: arr});
    }

    async componentDidMount(){
        let createSet = new Api();
        let userId = 9
        createSet.getSets(userId, this.CallBackSets)
    }

    render(){
        
        let setsListToShow = this.state.sets.map(setName => {return (
        <div  className="setBox" onClick={() => this.props.changeLearningSetCallBack(setName) } key = {setName}> {setName} </div>)
        })  

        return(
        <div className="addingToSetMenu"> 

            <div className="SetsListInChoosingBox" >
                {setsListToShow}

            </div>
            <div className = "CreatingSetBox">
            <input className = "CreatingSetBoxInput" id = "SetInput"></input>
            <div className = "createSetButton" onClick={() => this.CreateSet(9, "")}> Create new set</div>
            </div>
        </div>
        )
    }
}

export default SetsInChoosingBox
