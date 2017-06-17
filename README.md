# Increment An Integer API

A simple application that exposes an API for storing and incrementing an integer count based on the user. This was made for the Thinkific 2017 Coding Challenge.

## Contents

* [API Requirements](#api-requirements)
* [Assumptions](#assumptions)
* [Features](#features)
* [Improvements](#improvements)
* [Running Locally](#running-locally)
* [Run Deployed Version](#run-deployed-version)
* [API Endpoints](#api-endpoints)

## API Requirements

- An API that allows client to register using email and password.
- Registered users get provided an API Key that they use to access the API endpoint. Endpoints are protected by the API Key.
- Users can get their current stored count (int).
- Users can get their next integer based on the current stored count. This will increment the count in the database, for that user.

## Assumptions

- Client should save the API Key after logging/registering to make subsequent calls to the API
- Email and passwords can be safely sent to the API. This app uses normal HTTP and passes the user information in the payload. To improve this we could use HTTPS, OAuth or another method that protects user authentication credentials.
- API Keys are unique for each user and for the purposes of this app do not have an expiry date. Because of this, API Keys are used to search for users in our database; however, if the API Keys had an expiry date, we should additionally provide a clientId to the user to search the database and validate the API Key.
- The API UI doesn't need a lot of design, its purpose is to showcase the API functionality.

## Features
- Application build using the MEAN stack
- Deployed to Heroku
- Encrypts user passwords when storing to database using [bcrypt](https://github.com/shaneGirish/bcrypt-nodejs)
- API Key is a UUID generated for each user.
- User password verification (Yes, it requires a real password)

## Improvements
- Add Jamine unit tests for endpoints.
- Add CSS and organize the UI to look nicer.
- Add task runner to improve development and compile the UI better.

## Running Locally

Before you start make sure that you have the following installed:
- Node.js
- npm
- bower
- [Heroku CLI](https://cli.heroku.com/) (This is just to deploy it, not necessary)
- Mongodb

### Steps

```sh
$ git clone git@github.com:svaldivia/increment-int-api.git
$ cd increment-int-api
$ npm install
$ bower install
$ npm start
```

Remember to start `$ mongod` on a separate terminal window.

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Run Deployed version
Go to this [link](https://inc-int.herokuapp.com) and use the UI or just hit the following url your favorite HTTP tool:  
`https://inc-int.herokuapp.com`

## API Endpoints

### Register User
**[POST]** `/api/register`  

Registers a user based on the credentials provided in the payload.

**Payload:**
```json
{
    "email": "awesome@email.com",
    "password": "SomethingSecure1"
}
```

**Returns**  
The user's API Key

### Login User
**[POST]** `/api/login`  

Logs in a user based on the credentials provided in the payload.

**Payload:**
```json
{
    "email": "awesome@email.com",
    "password": "SomethingSecure1"
}
```

**Returns**  
The user's API Key

### Get Current Count
**[GET]** `/api/count`  

Get user's count from the database.

**Header:**
```
Authorization: "Your provided API Key",
```

**Returns**  
The user's current count

### Increment Count
**[GET]** `/api/count/next`  

Increment user's count in the database and retrieve the new value.

**Header:**
```
Authorization: "Your provided API Key",
```

**Returns**  
The user's new current count

### Reset Count
**[PUT]** `/api/count`  

Update user's count in the database based on the provided count

**Header:**
```
Authorization: "Your provided API Key",
```

**Payload:**
```json
{
    "count": 9001,
}
```

**Returns**  
The user's new current count
