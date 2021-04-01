// environment configutations
import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log(API_HOST)

export const getAllGames = (gameList) => {
  // the URL for the request
  const url = `${API_HOST}/api/games`;

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get all games");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      console.log(json.gameList)
      console.log(gameList)
      gameList.setState({ gameList: json.gameList });
      console.log(gameList)
    })
    .catch(err => {
      console.log(err);
    });
};
