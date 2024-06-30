const router=require('express').Router()
const User=require('./User/userController')
const movie=require('./Movies/movieController')
const complaint=require('./complaints/complaintController')


//user routes

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

//movies

router.post('/createMovie',movie.upload,movie.createMovie)
router.post('/updateMovieById/:id',movie.upload,movie.updateMovieById)
router.post('/deleteMovieById/:id',movie.deleteMovieById)
router.post('/addCast/:id',movie.uploadSingle,movie.addCast)
router.post('/getMovieById/:id',movie.getMovieById)
router.post('/approveMovieById/:id',movie.approveMovieById)
router.post('/getMoviesByGenre/:genre',movie.getMoviesByGenre)
router.post('/getMoviesByDirector/:director',movie.getMoviesByDirector)
router.post('/getCastBYMovieId/:id',movie.getCastBYMovieId)
router.post('/getMoviesByLanguage/:language',movie.getMoviesByLanguage)
router.post('/getApprovedMovies',movie.getApprovedMovies)
router.post('/getMoviesForApproval',movie.getMoviesForApproval)
router.post('/getAllMovies',movie.getAllMovies)

//complaints
router.post('/createComplaint',complaint.addcomplaint)
router.post('/viewAllcomplaints',complaint.viewAllcomplaints)
router.post('/viewcomplaintByUserId/:id',complaint.viewcomplaintByUserId)
router.post('/deletecomplaintById/:id',complaint.deletecomplaintById)


module.exports=router