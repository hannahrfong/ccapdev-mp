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

app.get('/', controller.getSignIn);
app.get('/register', controller.getRegister);
app.get('/menu', controller.getMenu);
app.get('/home', controller.getIndex);
app.get('/contact', controller.getContact);
app.get('/orderhistory', controller.getOrderHistory);
app.get('/about', controller.getAbout);
app.get('/profile', controller.getProfile);
app.get('/addresses', controller.getAddresses);
app.get('/contactnums', controller.getContactNums);
app.get('/id', controller.getID);
app.get('/addtobag/:name', controller.getAddToBag);
app.get('/getAddOn', controller.getAddOn);
app.get('/checkout', controller.getCheckout);
app.get('/confirmation', controller.getConfirmation);
app.get('/addOrderItem', controller.getAddOrderItem);
app.get('/getProduct', controller.getProduct);
app.get('/getBag', controller.getBag);
app.get('/getAllOrderItems', controller.getAllOrderItems);
app.get('/getOrderItem', controller.getOrderItem);
app.get('/updateBagItems', controller.getUpdateBagItems);
app.get('/search', controller.getSearch);
app.get('/searchresults', controller.getSearchResults);
app.get('/addfeedback', controller.getAddFeedback);
app.get('/addaccount', controller.getAddAccount);
app.get('/checkaccount', controller.getCheckAccount);
module.exports = app;