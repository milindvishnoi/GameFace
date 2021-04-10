import React, { Component } from 'react'
import "./styles.css";
import { uid } from "react-uid";
import { updateServerLikes, updateServerDislikes } from '../../actions/discussion'
import Post from '../../components/post';
import { Box } from '@material-ui/core'

export class DiscussionPanel extends Component {
    state = {
      pageStateIsSet: false,
      gamePosts: [],
    }

    addLike = (post) => {
      console.log(post == this.state.gamePosts[1])
      const copy = this.state.gamePosts.filter((item) => item !== post);

      const index = this.state.gamePosts.indexOf(post);
      let count = parseInt(post.likes) 
      count += 1
      post.likes = count.toString()
      console.log(copy, post.likes, count)
      copy.splice(index, 0, post)

      this.setState({
        gamePosts: copy
      })
      updateServerLikes(post, count)
    }

    disLike = (post) => {
      console.log(post == this.state.gamePosts[1])
      const copy = this.state.gamePosts.filter((item) => item !== post);

      const index = this.state.gamePosts.indexOf(post);
      let count = parseInt(post.dislikes) 
      count += 1
      post.dislikes = count.toString()
      console.log(copy, post.likes, count)
      copy.splice(index, 0, post)

      this.setState({
        gamePosts: copy
      })
      updateServerDislikes(post, count)
    }

  render() {
    const { index, page, gameAdminLoggedIn, siteAdminLoggedIn, userLoggedIn, user } = this.props

    if (this.state.pageStateIsSet === false && user.discussions.length > 0) {
      this.setState({
        pageStateIsSet: true,
        gamePosts: user.discussions
      })
    }

    const listPosts = () => {
      return (
        <Box>
        {user.discussions.map((post) => {
          return (
            <Post 
              key={uid(post)}
              post={post}
              currUser={user}
              loggedIn={userLoggedIn}
              addLike={this.addLike}
              disLike={this.disLike}
              isAdmin={ gameAdminLoggedIn || siteAdminLoggedIn }/>
          )
        })}
        </Box>)
    }

    return (
      <Box> 
        {index === page ? listPosts() : <div></div>}  
      </Box>   
    )
  }
}

export default DiscussionPanel
