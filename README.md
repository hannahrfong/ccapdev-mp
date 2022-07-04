# ccapdev-mp
intro here

## Contents
- [Controller](https://github.com/hannahrfong/ccapdev-mp/tree/main/controllers): contains all callback functions for server responses to client requests
- [Models](https://github.com/hannahrfong/ccapdev-mp/tree/main/models): contains all database models and database access functions
- [Public](https://github.com/hannahrfong/ccapdev-mp/tree/main/public): contains static assets such as CSS, JS, image, and font files
- [Routes](https://github.com/hannahrfong/ccapdev-mp/tree/main/routes): contains the server responses for HTTP method requests to a specific path in the server
- [Views](https://github.com/hannahrfong/ccapdev-mp/tree/main/views): contains all handlebars files rendered by the server
- [index.js](https://github.com/hannahrfong/ccapdev-mp/blob/main/index.js): the main file used to execute the web application
- [test.js](https://github.com/hannahrfong/ccapdev-mp/blob/main/test.js): the file used to initialize sample data in the database

## Follow the steps below to set-up the repository locally:
- Make sure MongoDB is installed and running.
- Run `node test.js` to initialize the contents of the database
- To run the application, execute `node index.js`

## NPM Libraries and Third-Party Libraries
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
