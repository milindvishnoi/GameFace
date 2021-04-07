// environment configutations
import ENV from '../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const signUp = (page) => {
  // the URL for the request
  const url = `${API_HOST}/api/user`;

  // Get all the state
  const { password, username, profilePic } = page.state

  const req = new FormData()
  req.append('username', username)
  req.append('password', password)
  req.append('profilePic', profilePic)

  const request = new Request(url, {
    method: "post",
    body: req,
  });

  fetch(request)
        .then(function (res) {
          if (res.status === 200) {
            console.log('added user sucessfully')
            window.location.href = '/login'
          } else {
            console.log('error loading')
          }
        })
        .catch(error => {
            console.log(error);
        });
}