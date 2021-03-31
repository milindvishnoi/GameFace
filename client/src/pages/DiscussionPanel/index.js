import React, { Component } from 'react'
import "./styles.css";
import { user } from '../../data'
import { uid } from "react-uid";

const usercomments = user.discussions
export class DiscussionPanel extends Component {
     //hardcoded data for testing.
    state = {
        comments: usercomments
    }

  render() {
    const { index, page } = this.props

    return (
      <div> 
        {
          index === page && (
          <div>
              <ul className='comments'>
                  {this.state.comments.map((comment) => {
                      return (
                          <li className='comment' key={uid(comment)}>
                              <span className='gameName'>{comment.gameName}</span> <br /> 
                              <span className='content'>{comment.content}</span> 
                          </li>
                      )
                  })}
              </ul>   
              
          </div>
          
          
         )
      }  
        
      </div>   
    )
  }
}

export default DiscussionPanel
