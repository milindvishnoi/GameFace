# team40
name(github id)
- Gabriel Libozada Anover(anoverga17)
- Renxi Sheng(putongzhongdan)
- Milind Vishnoi(Milind V.)
- Yicheng Yin(themarkyone)

# Major Updates Since Phase 1 
There are some leftover issues in Phase 1, such as crashes in game page, and some visual problems, we began Phase 2 with fixing all these problems. 

In Phase 1, the information on our web app is hard coded, and now we have implement backend and database into the app, route the API calls and integrate with the frontend. 


# Demo Page
https://evening-cove-91552.herokuapp.com/


# Testing Accounts
Admin: 
- username: admin
- password: admin

User
- username: user
- password: user


# Features That We implemented
Starter Page
- When you first open the app, you will be direct to this page. Anonymous user would not be able to use the features(check out the top game etc). 
- There are two buttons on the top right corner, on the red navbar, called "LOGIN" and "SIGN UP", which will direct the user to the LogIn Page and the SignUp page, depends on if they already have an account or not. 


LogIn Page
- You could log into the website by type in your username and password. You could select the "remember me" checkbox so you don't have to type in everytime you want to log in. 
- For testing purpose, we have already prepared accounts with username and password(as listed above in "Testing Accounts"). The two accounts above represent the two type of accounts that we supported: Admin, and User.


SignUp Page
- On this page, you could sign up with a username you want and a password. 
- You could choose your profile image by click on the "ChooseFile" and select the image you would like to use. 
- After that, you could create your own account by click on the red button which says "Sign Up". If you already have an account, you could click on the "Already A Member. Sign In" right below the sign up button to log in. 


After LogIn Page
- Once you log into the app, all features on this website are avaliable for you. You could scroll down into the TopGame section, where the most popular games will be listed here. You could find out more details about a single game by click on the image. 
- The "LogIn" and "SignUp" button will be replace your profile image. There will have two options after you click on the image: "My Profiles/Manage" button for User/Admin, and "Log Out" for all Account. 
- "My Account/Manage" button will lead User/Admin to their personal page. "Log Out" will just log them out and send them back to the Starter Page. 


Personal Page(User)
- This page include all information about the user, include user profile image, user name, self description. All these information are shown on the top part of the page. 
- There are three sections below the self description, "Profile", "Discussion", and "Games". 
- "Profile" include the user's username, nickname, and where they comes from. "Discussion" contains all postes that this user made, but their reply to other posts will not be shown here. "Games" presents the games that the user played, along with their id in the game. 
- The user could edit all these informations here. 


Manage Page(Admin)
- This page is simple as it is just for the admin to manager everything. 
- The admin will be able to edit the description and information about a game, and they could remove a game. 


Search Bar
- Anyone could find the game that they are looking for by type in keyword into the search bar.


Dark/Light Mode
- The web app could be switched between dark mode and light mode, simply by click on the button between the search bar and the personal profile image. 

# Folder Structure
```
team40
  |
  |-- client (frontend)
  |	    |-- public (icons and images)
  |     |-- src
  |			  |-- actions
  |			  |-- components
  |			  |-- pages
  |-- db
  |-- models
```
