const router=require('express').Router()
const User=require('./User/userController')
const movie=require('./Movies/movieController')
const complaint=require('./complaints/complaintController')
const subscriptions=require('./Subscriptions/subController')
const usersubscriptions=require('./User/UserSubscriptions/userSubController')
const wishlist=require('./Wishlist/wishlistController')
const like=require('./LikesAndComments/likesController')
const chat=require('./Chats/chatController')

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
router.post('/searchUserByName/:name', User.searchUserByName);

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


//Subscription plans
router.post('/addsubscriptionPlan',subscriptions.addsubscriptions)
router.post('/viewAllsubscriptionPlans',subscriptions.viewAllsubscriptionss)
router.post('/viewsubscriptionPlanById/:id',subscriptions.viewsubscriptionsById)
router.post('/deletesubscriptionPlanById/:id',subscriptions.deletesubscriptionsById)
router.post('/editsubscriptionPlanById/:id',subscriptions.editsubscriptionsById)


// User Subscriptions
router.post('/addSubscription',usersubscriptions.addSubscription)
router.post('/viewAllSubscriptions',usersubscriptions.viewAllSubscriptions)
router.post('/viewSubscriptionById/:id',usersubscriptions.viewSubscriptionById)
router.post('/deleteSubscriptionById/:id',usersubscriptions.deleteSubscriptionById)
router.post('/viewSubscriptionsByUserId/:id',usersubscriptions.viewSubscriptionsByUserId)
router.post('/addPayment/:id',usersubscriptions.addPayment)


//wishlist
router.post('/addWishlist',wishlist.addWishlist)
router.post('/viewAllWishlists',wishlist.viewAllWishlists)
router.post('/viewWishlistById/:id',wishlist.viewWishlistById)
router.post('/viewWishlistsByUserId/:id',wishlist.viewWishlistsByUserId)
router.post('/deleteWishlistById/:id',wishlist.deleteWishlistById)



//likes, reviews,rating
router.post("/addLike", like.addLike);
router.post("/countLikes/:id", like.countLikes);
router.post("/createReviews", like.createReviews);
router.post("/viewReviewsById/:id", like.viewReviewsById);
router.post("/viewReviewssByMovie/:id", like.viewReviewssByMovie);
router.post("/addRating/:id", movie.addRating);


//chats
router.post("/chatting", chat.chatting);
router.post("/viewChatBetweenUsers", chat.viewChatBetweenUsers);
router.post("/viewChatBetweenuserandSupport/:id", chat.viewChatBetweenuserandSuopport);
router.post("/viewChatRecipientsforUserById/:id", chat.viewChatRecipientsforUserById);


module.exports=router