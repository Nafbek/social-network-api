# social-network-api

## Description

This is an Application Programming Interface (API) developed for a social network web application that allows users to share their thoughts, react to the friends' thought and create a friend list. It is built using Express.js for handling HTTP requests, MongoDB as database, Mongoose ODM for object modelling, and a native JavaScript 'Date' object to format timestamps.

## User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation

In order to use this application, ensure that you have Node.js and Node Package Manager (npm) installed on your local machine. Clone the repository, open the root directory of the application on your terminal.

## Usage

First of all, run a command `npm install` to install the required dependencies. After installing the dependencies, run `npm start` or `npm run dev` to start the application.

You can test the API'S GET, POST, PUT, and DELETE routes in insomnia or related tools to successfully retrieve, create, update, and delete data in the connected database.

You can also follow the syntax below to view a walkthrough video that demonsatrates the functionality of the application.

![Demo Video] (https://drive.google.com/file/d/1nPnvGlEuqiA8QJdAuaGKoprqGAMCUdn_/view)

## License

This application is covered under the terms of the MIT License.
