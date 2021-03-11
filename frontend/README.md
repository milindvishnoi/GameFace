# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Log In 

We noticed that the instruction said that we should not us emails as usernames if possible. In our app, the user will create their own acount with their email, so we think that they could just use email as username. 

For Phase 1, we design the user/admin page with authentication provided in the handout. That is: 
1.For Admin acount, the username is 'admin@admin.com' and the password is 'admin'. 
2.For User acount, the username is 'user@user.com' and the password is 'user'. 


### Top Game 

Top Game is a key feature of our application, where the user could find what are the most popular games now. This feature is one major feature that makes our application different from other gaming community, such as Steam. 


### Game Page - User

User could comment on a game, reply to someone else's post, like or dislike the post/reply. 


### Game Page - Admin

Admin could do everything a user could do on a game page, include comment, reply, like and displike. 

In addition, the Admin delete a post or a reply message in the discussion board for a game, if they thought that it is not apporiate in the community. Admin could also delete a game from the game database if they think that this game against the user standards, but this part is not implemented yet and will be applied in the future staging. 


### User Profile - User

User could edit their cover image, profile picture, username and biography here. For Phase 1, we hard code the user profile for an user, but we will update it in Phase 2. 

For each user, the "Profile" section will provide their username, nickname, and the country/region they lived in. The "Discussion" section will show all the discussions that this user involved with in different gaming community. The "Games" section will present all kinds of games that this user played. These sections should not be fixed by the user. 

User could log out from their account by click on the "LOG OUT" button at the bottom of their profile page. 


### User Profile - Admin

Admin could not do anything in the user profile. Only the user could edit their own profile. 
However, if the user violates the user agreement and make an awful impact with the gaming community, the admin is allowed to ban the user and delete the profile. 


