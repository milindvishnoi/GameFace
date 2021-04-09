// environment configutations
import ENV from '../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const getAllGames = (page) => {
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
      page.setState({ gameList: json.gameList });
    })
    .catch(err => {
      log(err);
    });
};

export const searchGame = (page) => {
  log('reaching searchgame')
  // the URL for the request
  let url = `${API_HOST}/api/search/`;

  // Search Field all states
  const game = page.state

  if (game.searchField === '') {
    getAllGames(page)
    return
  }

  // Updating url according to searchField
  url = `${url}${game.searchField}`

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not that game games");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      if (json)
        page.setState({ 
          gameList: json.gameList 
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteGame = (page) => {
  const { deleteId, gameList } = page.state

  // Updating url according to searchField
  const url = `${API_HOST}/api/game`
  const id = deleteId

  const req = {id: deleteId}

  const request = new Request(url, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req),
  })

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not delete game");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      if (json) {
        getAllGames(page)
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export const editGameInfo = (page) => {
  const { game, title, description } = page.state

  const url = `${API_HOST}/api/game/edit`

  const req = {
    game_id: game._id,
    title: title,
    description: description
  }

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(req),
  })

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not edit game");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      if (json) {
        getAllGames(page)
        page.setState({
          open: false
        })
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export const addNewGame = (form, page) => {
  // the URL for the request
  const url = `${API_HOST}/api/game`;

  console.log(form.image.files[0])

  // Get all the state
  const { title, description } = page.state

  const data = new FormData()
  data.append('title', title)
  data.append('description', description)
  data.append('image', form.image.files[0])

  const request = new Request(url, {
    method: "post",
    body: data
  })

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could add a game");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      if (json) {
        alert(`Added ${json.title}!`)
      }
    })
    .catch(err => {
      console.log(err);
    });
}