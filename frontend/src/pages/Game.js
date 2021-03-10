import { Box, Button, Chip,  Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './GamePage.css'
import Post from '../components/post'
import TextForm from '../components/textform'
// The appropriate game data to be imported from a server (description is from the PS4 website for 2K21)
import { games, posts } from '../data'
import { uid } from 'react-uid'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

export class Game extends Component {
    state = {
      gamePosts: posts,
      displayGame: games[0]
    }

    // Requires a server call to update Posts list
    pushPost = (user, title_, content) => {
      const copy = this.state.gamePosts.map((item) => item);
      copy.push({
          username: user,
          title: title_,
          postContent: content,
          likes: "0",
          dislikes: "0",
          replies: []
      });
      this.setState({
        gamePosts: copy
      });
    }

    deletePost = (post) => {
      const copy = this.state.gamePosts.filter((gpost) => gpost !== post)
      this.setState({
        gamePosts: copy
      });
    }

    render() {
      const {userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn} = this.props;

      const isLoggedIn = userLoggedIn || gameAdminLoggedIn || siteAdminLoggedIn;
      const addPostMaker = () => {if (isLoggedIn) {
        return (
          <Box className="rightBox">
            <TextForm
                buttonName="Create New Post"
                buttonVar="contained"
                buttonColor="primary"
                formTitle="Create New Post"
                formInstructions="Start an engaging discussion:" 
                formLabel="" 
                formRows={10} 
                sendFormName="Post"
                hasTitle={true}
                titleInstr="Make an interesting title:"
                onSubmit={this.pushPost}
              />
          </Box>
        )}} 

      return (
        <div>
          <Box mb={4}>
          <GameHeader gameTitle={this.state.displayGame.title}
                      rating={this.state.displayGame.score}
                      description={ this.state.displayGame.description}
                      gTags={this.state.displayGame.tags}
                      imgUrl={this.state.displayGame.imgSrc}
                      gameAdminLoggedIn={gameAdminLoggedIn}
                      siteAdminLoggedIn={siteAdminLoggedIn}
                      isLoggedIn={isLoggedIn}/> 
          </Box>
          {addPostMaker()}
          <Box id="postsSection">
            {this.state.gamePosts.map((post) => {
              return (
                <Post username={post.username}
                      content={post.postContent}
                      title={post.title}
                      likes={post.likes}
                      dislikes={post.dislikes}
                      replies={post.replies}
                      loggedIn={isLoggedIn}
                      isAdmin={ gameAdminLoggedIn || siteAdminLoggedIn }
                      onDelete={ () => this.deletePost(post)}/>
              )
            })}
          </Box>
        </div>
      )
    }
  }

  class GameHeader extends Component {
    state = {
      title: "",
      desc: "",
      hTags: []
    }

    // Require Server Calls to update data
    deleteTag = (tag) => {
      const copy = this.state.hTags.filter((ntag) => ntag !== tag);
      this.setState({
        hTags: copy
      });
    }

    changeInfo = (dummyVar, newTitle, newDesc) => {
      this.setState({
        title: newTitle,
        desc: newDesc
      });
    }

    render() {
      const { gameTitle, description, rating, isLoggedIn, 
              siteAdminLoggedIn, gameAdminLoggedIn, gTags, imgUrl} = this.props;

      if (this.state.hTags.length === 0 && gTags.length !== 0) {
        this.setState({
          hTags: gTags
        });
      }
      if (this.state.desc === "" && description !== "") {
        this.setState({
          desc: description
        });
      }
      if (this.state.title === "" && gameTitle !== "") {
        this.setState({
          title: gameTitle
        });
      }

      const splitDescription = (str) => {
      /* Splits <str> appropriatley depending on where \n is in the text */
      return(
          <div>
            {str.split("\n").map((pargph) => (<Typography>{pargph}<br/></Typography>))}
          </div>
        )
      }

      const addEditGameInfoButton = () => {
        if (siteAdminLoggedIn === true) {
          return (
            <Box className="rightBox">
            <TextForm
                buttonName="Edit"
                buttonVar="outlined"
                buttonColor="primary"
                formTitle="Edit Game Info"
                formInstructions="Description: " 
                formLabel="" 
                formRows={10} 
                sendFormName="Edit"
                hasTitle={true}
                titleInstr="Game Title: "
                defaultText={this.state.desc}
                defaultTitle={this.state.title}
                onSubmit={this.changeInfo}
              />
            </Box>
          )
        }
      }

      const addTags = () => {
        if (siteAdminLoggedIn === true || gameAdminLoggedIn === true) {
          return (
            <Box display='flex'>
              {this.state.hTags.map((tagContent) => (
                <Box mr={1}>
                  <Chip key={uid(tagContent)} label={tagContent} onDelete={() => this.deleteTag(tagContent)} size='medium' />
                </Box>
              ))}
              <Box mr={1}>
                  <Chip variant="outlined"
                        label="Add Tag" 
                        onDelete={() => {}} 
                        deleteIcon={<AddCircleOutlineIcon />}
                        size='medium' />
              </Box>
            </Box>
          )
        } else {
          return (
            <Box display='flex'>
              {gTags.map((tagContent) => (
                  <Box mr={1}>
                    <Chip label={tagContent} size='medium' />
                  </Box>
                ))}
            </Box>
          )
        }
      }

      return (
          <Box marginTop="2vh">
            <Grid container spacing={2} justify="center">
              <Grid item xs={4}>
                <div align="center">
                  <img class="gameIcon" src={process.env.PUBLIC_URL + imgUrl} alt=''/>
                  <Typography>Rating: { rating }%</Typography>
                  <Button variant='outlined' disabled={!isLoggedIn}>Upvote</Button>
                </div>
              </Grid>
              <Grid id="descriptionPanel" item xs={8}>
                <Typography variant='h1' color='primary'>
                  { this.state.title }
                </Typography>
                <Typography><br/>{ splitDescription(this.state.desc) }<br/></Typography>
                {addEditGameInfoButton()}
                {addTags()}
              </Grid>
            </Grid>
          </Box>
          
      )
    }
  }

  export default Game