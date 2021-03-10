import { Box, 
    IconButton,  
    Paper,
    Typography} from '@material-ui/core'
import {Reply, ThumbUp, ThumbDown} from '@material-ui/icons';
import React, { Component } from 'react'
import './post.css'
import TextForm from './textform'

export class Post extends Component {
    render() {
        const { username, title, likes, dislikes, content, replies} = this.props;
        return(
            <Paper elevation={3} square={false} className="postContainer">
            <Box className="postContentContainer">
                <Box className="opUserInfo">
                    <img className='opProfilePic' 
                         src={process.env.PUBLIC_URL + '/images/user.jpeg'}/>
                    <Box className='opUsername'>
                        <Typography variant="h5">@{ username }</Typography>
                    </Box>
                </Box>
                <Typography variant="h4">{ title }</Typography>
                <Box className="postTextContent">
                    <Typography>{ content }</Typography>
                </Box>
                <Box id="responsesSection">
                    <Box className="upvoteButtonsPanel">
                        <Box className="upvoteButton">
                            <Typography>{ likes }</Typography>
                            <IconButton><ThumbUp/></IconButton>
                        </Box>
                        <Box className="upvoteButton">
                            <Typography>{ dislikes }</Typography>
                            <IconButton><ThumbDown/></IconButton>
                        </Box>
                    </Box>
                    <TextForm
                        buttonName="Reply"
                        buttonVar="outlined"
                        formTitle="Reply to this post"
                        formInstructions="Your Reply:" 
                        formLabel="" 
                        formRows={10} 
                        sendFormName="Reply"
                        siconType={<Reply>Reply</Reply>}
                    />
                </Box>
                <Box className='repliesSection'>
                    {replies.map((post) => {
                        return(
                            <ReplyPost 
                                username={post.username}
                                content={post.replyContent}/>
                        )
                    })}
                </Box>
            </Box>
            </Paper>
        )
    }
}

class ReplyPost extends Component {
    render() {
        const {username, content} = this.props;
        return(
            <Box className='reply'>
                <Typography variant='h6'>@{username}</Typography>
                <Box className='replyContent'>
                    <Typography>{content}</Typography>
                </Box>
            </Box>
        )
    }
}

export default Post