const router=require('express').Router()
const User=require('./User/userController')


//user routes
//User routes
router.post('/registerUser',User.upload, User.registerUser);
router.post('/viewUserById/:id', User.viewUserById)
router.post('/editUserById/:id',User.upload,User.editUserById);
router.post('/addUserPreferences/:id',User.addUserPreferences);

router.post('/forgotPassword', User.forgotPassword);
router.post('/viewUsers', User.viewUsers); 
router.post('/deleteUserById/:id', User.deleteUserById);
router.post('/resetPassword/:id', User.resetPassword);
router.post('/loginUser', User.login);
router.post('/requireAuthUser', User.requireAuth);

module.exports=router