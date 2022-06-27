/*const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const profileController = require('../controllers/profileController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);
app.get('/signup', signupController.getSignUp);
app.post('/signup', signupController.postSignUp);
app.get('/getCheckID', signupController.getCheckID);
app.get('/success', successController.getSuccess);
app.get('/profile/:idNum', profileController.getProfile);
module.exports = app;
*/

const express = require('express');
const controller = require('../controllers/controller.js');

const app = express();

app.get('/', controller.getIndex);
app.get('/menu', controller.getMenu);
app.get('/contact', controller.getContact);

module.exports = app;