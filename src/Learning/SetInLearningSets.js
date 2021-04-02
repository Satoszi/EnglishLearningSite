import React from "react";
import '../index.css';
import GetWords from '../Api/Api.js';

export class SetsInLearningSet extends React.Component{

    state = {
        sets: []
    }
    
    CallBackSets = (arr) => {
        this.setState({sets: arr});
    }

    async componentDidMount(){
        let createSet = new GetWords();
        let userId = 9
        createSet.getSets(userId, this.CallBackSets)
    }

    render(){
        let setsListToShow = this.state.sets.map(e => {return (
            <div  className="setBox" key = {e}> {e} </div>)
            })  
        return(
            {setsListToShow}
        )
    }
}

export default SetsInLearningSet