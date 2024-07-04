const mongoose = require("mongoose");
const Wishlist = require('./wishlistSchema'); // Assuming the file is named wishlistSchema.js
const wishlists = require("./wishlistSchema");

const addWishlist =async (req, res) => {
    let data=await wishlists.findOne( {userId: req.body.userId,movieId: req.body.movieId})
    if(!data){
  const newWishlist = new Wishlist({
    userId: req.body.userId,
    date: new Date(),
    movieId: req.body.movieId,
  });

  newWishlist.save()
    .then(data => {
      res.json({
        status: 200,
        message: "Wishlist item added successfully",
        data: data,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        err: err,
        status: 500,
      });
    });
}else{
    return   res.json({
        status: 409,
        message: "Movie Already In Your Wishlist !!"
            
})
}
};

const viewAllWishlists = (req, res) => {
  Wishlist.find()
    .populate('userId')
    .populate('movieId')
    .exec()
    .then(wishlists => {
      res.status(200).json({
        status: 200,
        message: "Wishlists retrieved successfully",
        data: wishlists,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: "Error retrieving wishlists",
        error: err,
      });
    });
};

const deleteWishlistById = (req, res) => {
  Wishlist.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(wishlist => {
      res.json({
        status: 200,
        message: "Wishlist item deleted successfully",
        data: wishlist,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error deleting wishlist item",
        error: err,
      });
    });
};

const viewWishlistById = (req, res) => {
  Wishlist.findById({ _id: req.params.id })
    .populate('userId')
    .populate('movieId')
    .exec()
    .then(wishlist => {
      res.json({
        status: 200,
        message: "Wishlist item retrieved successfully",
        data: wishlist,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving wishlist item",
        error: err,
      });
    });
};

const viewWishlistsByUserId = (req, res) => {
  Wishlist.find({ userId: req.params.id })
    .populate('userId')
    .populate('movieId')
    .exec()
    .then(wishlists => {
      res.json({
        status: 200,
        message: "Wishlists retrieved successfully",
        data: wishlists,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving wishlists",
        error: err,
      });
    });
};

module.exports = {
  addWishlist,
  viewAllWishlists,
  viewWishlistById,
  deleteWishlistById,
  viewWishlistsByUserId,
};
