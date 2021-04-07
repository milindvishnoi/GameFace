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
}