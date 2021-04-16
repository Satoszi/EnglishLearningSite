import React from 'react';
import './manager.css';

class AddYourList extends React.Component {

    render() {
          
      return (
        
        <div className = "yourList addNew"> 
          Add new +
        </div>        
       );
     }
  } 

  class YourList extends React.Component {

    render() {
          
      return (
        
        <div className = "yourList"> 
          YourList
        </div>        
       );
     }
  } 

export class YourListsManager extends React.Component {


    render() {
      
      return (
        <div className = "YourListsManager"> 
            <div className = "managerMiniBar" >Your Lists </div>
            <AddYourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>
            <YourList/>

        </div>     
       );
     }
  } 
  
export default YourListsManager