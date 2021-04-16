import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CompleteListsContent from './CompleteListsContent'
import CompleteListsManager from './CompleteListsManager'
import YourListsContent from './YourListsContent'
import YourListsManager from './YourListsManager'

class AddYourList extends React.Component {

    render() {
          
      return (
        
        <div className = "YourList"> 
          AddYourList
        </div>        
       );
     }
  } 

  class YourList extends React.Component {

    render() {
          
      return (
        
        <div className = "YourList"> 
          AddYourList
        </div>        
       );
     }
  } 

export class WordsManager extends React.Component {

  render() {

    return (
      
      <div className = "Manager"> 
        <CompleteListsManager/>
        <YourListsManager/>
        <CompleteListsContent/>
        <YourListsContent/>
        
      </div>        
     );
   }
} 

export default WordsManager
