import ENV from '../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const createPost = (title_, content_, page) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/discussion`, {
        method: "post",
        body: JSON.stringify({
            game_id: page.props.displayGame._id,
            title: title_, 
            name: page.props.currUser.username, 
            imgLink: page.props.currUser.profilePic,
            content: content_
        })
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.discussion !== undefined) {
                page.setState({ 
                    gamePosts: json.discussion
                });
            } 
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateServerLikes = (game, liks) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/game/discussion/like`, {
        method: "patch",
        body: JSON.stringify({
          game_id: game._id,
          likes: liks
        })
    });
  
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
              return true;
            }
        })
        .catch(error => {
            console.log(error);
        });
    return false;
  };
  
export const updateServerDislikes = (game, dislikes) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/game/discussion/dislike`, {
        method: "patch",
        body: JSON.stringify({
          game_id: game._id,
          likes: dislikes
        })
    });
  
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
              return true;
            }
        })
        .catch(error => {
            console.log(error);
        });
    return false;
  };