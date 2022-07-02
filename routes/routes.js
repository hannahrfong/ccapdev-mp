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

app.get('/', controller.isPrivate, controller.getIndex);
app.get('/register', controller.isPublic, controller.getRegister);
app.get('/menu', controller.isPrivate, controller.getMenu);
app.get('/signin', controller.isPublic, controller.getSignIn);
app.get('/contact', controller.isPrivate, controller.getContact);
app.get('/orderhistory', controller.isPrivate, controller.getOrderHistory);
app.get('/about', controller.isPrivate, controller.getAbout);
app.get('/profile', controller.isPrivate, controller.getProfile);
app.get('/addresses', controller.isPrivate, controller.getAddresses);
app.get('/contactnums', controller.isPrivate, controller.getContactNums);
app.get('/id', controller.isPrivate, controller.getID);
app.get('/addtobag/:id', controller.isPrivate, controller.getAddToBag);
app.get('/getAddOn', controller.isPrivate, controller.getAddOn);
app.get('/checkout', controller.isPrivate, controller.getCheckout);
app.get('/confirmation/:orderId', controller.isPrivate, controller.getConfirmation);
app.get('/addOrderItem', controller.isPrivate, controller.getAddOrderItem);
app.get('/getProduct', controller.isPrivate, controller.getProduct);
app.get('/getBag', controller.isPrivate, controller.getBag);
app.get('/getAccount', controller.isPrivate, controller.getAccount);
app.get('/getAllOrderItems', controller.isPrivate, controller.getAllOrderItems);
app.get('/getOrderItem', controller.isPrivate, controller.getOrderItem);
app.get('/updateBagItems', controller.isPrivate, controller.getUpdateBagItems);
app.post('/checkout', controller.isPrivate, controller.postCheckout);
app.get('/updateBagView', controller.isPrivate, controller.getUpdateBagView);
app.get('/search', controller.isPrivate, controller.getSearch);
app.get('/searchresults', controller.isPrivate, controller.getSearchResults);
app.get('/addfeedback', controller.isPrivate, controller.getAddFeedback);
app.post('/addaccount', controller.postAddAccount);
app.post('/checkaccount', controller.postCheckAccount);
app.get('/logout', controller.isPrivate, controller.getLogout);
app.get('/delete', controller.isPrivate, controller.getDeleteAccount);
app.post('/updateDetails', controller.isPrivate, controller.postUpdateDetails);
app.get('/changepw', controller.isPrivate, controller.getChangePassword);
app.get('/addaddress', controller.isPrivate, controller.getAddAddress);
app.get('/addnumber', controller.isPrivate, controller.getAddNumber);
app.get('/addid', controller.isPrivate, controller.getAddID);
app.post('/updateelement', controller.isPrivate, controller.postUpdateArrayElement);
app.get('/addQuantity', controller.isPrivate, controller.getAddQuantity);
app.get('/subtractQuantity', controller.isPrivate, controller.getSubtractQuantity);
app.get('/deleteOrderItem', controller.isPrivate, controller.getDeleteOrderItem);
app.get('/getItemQuantity', controller.isPrivate, controller.getItemQuantity);
module.exports = app;