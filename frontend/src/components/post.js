import { Box, 
    Container, 
    Grid, 
    Typography} from '@material-ui/core'
import React, { Component } from 'react'
import './post.css'

export class Post extends Component {
    render() {
        const { username, content} = this.props;
        return(
            <Box id="postContainer">
                <Grid container spacing={3}>
                    <Grid item>
                        <Box marginTop="5px">
                            <img className='opProfilePic' 
                                src={process.env.PUBLIC_URL + 'gamepad.svg'}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop="14px">
                            <Typography variant="h5">
                                @{username}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box className="textWrapper">
                    <Typography>
                        {content}
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default Post