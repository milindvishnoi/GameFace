import { Box, 
    IconButton,  
    Paper,
    Typography} from '@material-ui/core'
import {Reply, ThumbUp, ThumbDown, Delete, StarOutline} from '@material-ui/icons';
import React, { Component } from 'react'
import './post.css'
import TextForm from './textform'

export class Post extends Component {
    state = {
        postReplies: []
    }

    // Requires a server call to update reply list
    pushReply = (user, reply) => {
        const copy = this.state.postReplies.map((item) => item);
        copy.push({
            username: user,
            replyContent: reply
        });
        this.setState({
            postReplies: copy
        });
    }

    render() {
        const { username, title, likes, dislikes, content, replies, loggedIn, isAdmin} = this.props;

        if (this.state.postReplies.length === 0 && replies.length !== 0) {
            this.setState({
                postReplies: replies
            });
        }

        const addReplyButton = () => {
            if (loggedIn) {
                return (
                    <TextForm
                        buttonName="Reply"
                        buttonVar="outlined"
                        formTitle="Reply to this post"
                        formInstructions="Your Reply:" 
                        formLabel="" 
                        formRows={10} 
                        sendFormName="Reply"
                        siconType={<Reply>Reply</Reply>}
                        onSubmit={this.pushReply}
                    />
            )} 
        }

        const addAdminCommands = () => {if (isAdmin) {
            return (
                <Box className="adminCommands">
                    <IconButton><StarOutline /></IconButton>
                    <IconButton><Delete /></IconButton>
                </Box>
            )}}

        return(
            <Paper elevation={3} square={false} className="postContainer">
            <Box className="postContentContainer">
                {addAdminCommands()}
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
                            <IconButton disabled={!loggedIn}><ThumbUp/></IconButton>
                        </Box>
                        <Box className="upvoteButton">
                            <Typography>{ dislikes }</Typography>
                            <IconButton disabled={!loggedIn}><ThumbDown/></IconButton>
                        </Box>
                    </Box>
                    {addReplyButton()}
                </Box>
                <Box className='repliesSection'>
                    {this.state.postReplies.map((post) => {
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