# calliope
Calliope redone with Ruby on Rails, React, and AWS. [Live on Heroku](https://calliope-redux.herokuapp.com/).

# User Stories

## Prompts and Replies
* Users can browse stories and prompts as guests, but must log in to create prompts or stories.
* Users can view individual prompts and all responses to it on the prompt show page.
* All response show pages link back to the prompt they came from.

## Users
* Users can sign up with their email address and verify their account through an email confirmation link.
* If a user forgets their password, they can request to receive a verification token and change their password.
* Logged in users can update their avatar and password on their account page.
* Everything a user posts may be seen on their profile page.
* Users are automatically signed in whenever they visit the page, across browser refreshes, unless they sign out.

# Tech Used
* Ruby on Rails
* Postgres
* React
* React Router
* AWS RDS (Amazon Web Services' Relational Database Service)
* AWS Cognito & Amplify library
* Quotes API
* Bootstrap CSS Framework

# Future improvements
* A WYSIWYG editor like DraftJS
* Users can add stories and prompts to their favorites.
* Users can have photo and video prompts.
* Users can delete their accounts.

# "Wireframe"
The product should look more or less the same as [this site](https://calliope-app.herokuapp.com/) with some minor adjustments.
