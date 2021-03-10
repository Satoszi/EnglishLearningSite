import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './learning.css';
import LearningCardBoxes from './LearningCardBoxes'



  export class LearningWords extends React.Component {



    render() {
      return (
        <div> 
            {/* <div className="choosingTitle"> Learning words </div> */}
            <div style={{display:"flex"}}>
                <div className="sets"> Set 1 </div>

                 <div className="learningDiv">
                        <LearningCardBoxes/> 
                </div>

            </div>
        </div>        
      );
    }
  } 

  export default LearningWords
