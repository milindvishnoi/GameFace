import Post from '../components/post.js';
import ENV from '../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const createPost = (title_, content_, page) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/discussion`, {
        method: "post",
        body: JSON.stringify({
            game_id: page.state.displayGame._id,
            user_id: page.props.currUser._id,
            title: title_, 
            name: page.props.currUser.username, 
            imgLink: page.props.currUser.profilePic,
            content: content_
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res)
                return res.json();
            }
        })
        .then(json => {
            if (json.discussions !== undefined) {
                page.setState({
                    displayGame: json, 
                    gamePosts: json.discussions
                });
            } 
        })
        .catch(error => {
            console.log(error);
        });
}

export const pushServerReply = (repl, post, page) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/game/reply`, {
        method: "post",
        body: JSON.stringify({
            post_id: post._id,
            reply: repl
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res)
                return res.json();
            }
        })
        .then(json => {
            if (json.replies !== undefined) {
                log("here in replies")
                page.setState({ 
                    postReplies: json.replies
                });
                //window.location.href = `/games/${page.props.gameID}`;
            } 
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateServerLikes = (post, liks) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/game/discussion/like`, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post_id: post._id,
          likes: liks
        })
    });
  
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
  };
  
export const updateServerDislikes = (post, disliks) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/game/discussion/dislike`, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            post_id: post._id,
            dislikes: disliks
        })
    });
  
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
  };