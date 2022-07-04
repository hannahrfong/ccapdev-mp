# ccapdev-mp
This repository contains the necessary files for a food ordering web application for the restaurant called The Hungry Sibs. In this web application, users will be able to create an account and log in to view the food items offered by the restaurant and order the items they want to be delivered to their specified address. The web application stores the account details of every user and their corresponding order history. The session of a logged-in user lasts for 3 weeks, but the user may opt to end the session prematurely by logging out from the application. A user may also opt to delete their account from the database of the application. Aside from being able to facilitate order transactions, the web application also provides relevant information about the business and provides a means for customers to give their feedback, which are stored in the database. Social media pages of the business are also included in the web application for advertising.

## Contents
- [Controller](https://github.com/hannahrfong/ccapdev-mp/tree/main/controllers): contains all callback functions for server responses to client requests
- [Models](https://github.com/hannahrfong/ccapdev-mp/tree/main/models): contains all database models and database access functions
- [Public](https://github.com/hannahrfong/ccapdev-mp/tree/main/public): contains static assets such as CSS, JS, image, and font files
- [Routes](https://github.com/hannahrfong/ccapdev-mp/tree/main/routes): contains the server responses for HTTP method requests to a specific path in the server
- [Views](https://github.com/hannahrfong/ccapdev-mp/tree/main/views): contains all handlebars files rendered by the server
- [index.js](https://github.com/hannahrfong/ccapdev-mp/blob/main/index.js): the main file used to execute the web application
- [test.js](https://github.com/hannahrfong/ccapdev-mp/blob/main/test.js): the file used to initialize sample data in the database

## Follow the steps below to set-up the repository locally:
1. Clone the repository or download the zipped folder.
2. Open the command prompt.
3. Navigate to the project folder.
4. Install the necessary NPM libraries by running `npm install`.
4. Make sure MongoDB is installed and running.
5. Run `node test.js` to initialize the contents of the database. This must only be done once to avoid duplication of data.
6. To run the application, execute `node index.js`.
7. Go to the browser and enter `localhost:3000` in the URL to access the web application.

## NPM Packages and Third-Party Libraries
### NPM
- bcrypt
- connect-flash
- connect-mongo
- express
- express-handlebars
- express-session
- hbs
- mongoose
### Third-Party
- Bootstrap
