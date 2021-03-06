//Required Packages
const express = require('express');
const userController = require('./controllers/user.controller');
const productCategoryController = require('./controllers/productCategory.controller');
const productController = require('./controllers/product.controller');
const filterController = require('./controllers/filter.controller');
const passport = require('passport');
const userRouter = express.Router();

//For protected routes
const option =passport.authenticate('jwt', {
  session: false
})

//Routes
userRouter.post('/', userController.create);
userRouter.get('/login/auth', option, userController.auth);
userRouter.post('/login', userController.loginFunction);
userRouter.post('/logout', userController.logout);
userRouter.post('/category/add',option, productCategoryController.addCategory);
userRouter.get('/category/', productCategoryController.getProductCategories);
userRouter.get('/product/',option, productController.getProducts);
userRouter.get('/product/:id',option, productController.getProduct);
userRouter.post('/product/add',option, productController.addProduct);
userRouter.get('/category/:id',option, filterController.getProductByCategories);
userRouter.get('/categoryById/:id',option, productCategoryController.getCategory);

//define routes function
const routes = (app) => {

  //set the path and router to be used for requests on those paths 
  app.use('/user', userRouter);

  //On home(localhost:8081/)
  app.get('/', (req, res) => {
    return res.send({
      message: "User Service Up!"
    });
  })
}

module.exports = routes;