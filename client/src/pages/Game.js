import { Box, Button, Chip,  Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './GamePage.css'
import TextForm from '../components/textform'
// The appropriate game data to be imported from a server (description is from the PS4 website for 2K21)
import { updateServerLikes, updateServerDislikes, createPost } from '../actions/discussion'
import { searchGameById } from '../actions/games'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Post } from '../components/post'

export class Game extends Component {
    state = {
      pageStateIsSet: false,
      displayGame: {
        _id: 0,
        title: '',
        score: 0,
        description: '',
        tags: [],
        discussions: [],
        link: '',
        imgSrc: ''
      },
      gamePosts: [],
    }

    componentWillMount() {
      const { id } = this.props.match.params;
      console.log(id)
      searchGameById(id, this);
    }

    pushPost = (title_, content) => {
      createPost(title_, content, this);
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
      const {userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn, currUser} = this.props;

      const splitDescription = (str) => {
        /* Splits <str> appropriatley depending on where \n is in the text */
        return(
          <div>
            {str.split("\n").map((pargph) => (<Typography>{pargph}<br/></Typography>))}
          </div>
        )
      }

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
                      description={ () => splitDescription(this.state.displayGame.description)}
                      gTags={this.state.displayGame.tags}
                      imgUrl={this.state.displayGame.imgSrc}
                      gameAdminLoggedIn={gameAdminLoggedIn}
                      siteAdminLoggedIn={siteAdminLoggedIn}
                      isLoggedIn={isLoggedIn}/> 
          </Box>
          {addPostMaker()}
          <Box id="postsSection">
            {this.state.displayGame.discussions.map((post) => {
              return (
                <Post post={post}
                      loggedIn={isLoggedIn}
                      currUser={currUser}
                      addLike={this.addLike}
                      disLike={this.disLike}
                      isAdmin={ gameAdminLoggedIn || siteAdminLoggedIn }/>
              )
            })}
          </Box>
        </div>
      )
    }
  }

  class GameHeader extends Component {
    render() {
      const { gameTitle, description, rating, isLoggedIn, 
              siteAdminLoggedIn, gameAdminLoggedIn, gTags, imgUrl} = this.props;


      const addTags = () => {
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

      return (
          <Box marginTop="2vh">
            <Grid container spacing={2} justify="center">
              <Grid item xs={4}>
                <div align="center">
                  <img class="gameIcon" src={process.env.PUBLIC_URL + imgUrl} />
                  <Typography>Rating: { rating }%</Typography>
                  <Button variant='outlined' disabled={!isLoggedIn}>Upvote</Button>
                </div>
              </Grid>
              <Grid id="descriptionPanel" item xs={8}>
                <Typography variant='h2' color='primary'>
                  { gameTitle }
                </Typography>
                <Typography><br/>{ description() }<br/></Typography>
                {addTags()}
              </Grid>
            </Grid>
          </Box>
          
      )
    }
  }

  export default Game