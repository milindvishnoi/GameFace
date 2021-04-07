// environment configutations
import ENV from '../config.js'
const API_HOST = ENV.api_host
const log = console.log

export const signUp = (form, page) => {
  // the URL for the request
  const url = `${API_HOST}/api/user`;

  // Get all the state
  const { password, username, profilePic } = page.state

  console.log(form.image)

  const data = new FormData()
  data.append('username', username)
  data.append('password', password)
  data.append('image', form.image.files[0])
  console.log(data)

  const request = new Request(url, {
    method: "post",
    body: data,
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
};

// A function to send a POST request with the user to be logged in
export const login = (user, pass, app) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`${API_HOST}/api/login`, {
      method: "post",
      body: JSON.stringify({
        username: user,
        password: pass
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
            return res.json();
          }
      })
      .then(json => {
          if (json.currentUser !== undefined && json.adminPriv === true) {
              app.setState({ 
                  currUser: json.currentUser,
                  adminLogin: true,
                  userLogin: false 
              });
          } else if (json.currentUser !== undefined && json.adminPriv === false) {
              app.setState({ 
                  currUser: json.currentUser,
                  adminLogin: false,
                  userLogin: true 
              });
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
  const url = `${API_HOST}/users/logout`;

  fetch(url)
      .then(res => {
          app.setState({
              currentUser: null,
              adminLogin: false,
              userLogin: false 
              //message: { type: "", body: "" }
          });
      })
      .catch(error => {
          console.log(error);
      });
};