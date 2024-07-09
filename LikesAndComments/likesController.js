const express = require('express');
const router = express.Router();
const Like = require('./likesSchema');
const Reviews = require('./reviewSchema');


// Add like to a Reviews
const addLike = async (req, res) => {
    const {userId , movieId } = req.body;
    let like =null
    try {
      
        if(userId)
            like = await Like.findOne({ movieId, userId });

        if (like) {
            like.liked = !like.liked;
        } else {
            like = new Like({
                movieId,
                liked: true,
                userId,
               
            });
        }

        

        const savedLike = await like.save();
        res.status(200).json({
            status: 200,
            msg: "Like status updated successfully",
            data: savedLike
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update like status",
            Error: err.message
        });
    }
};


// Count likes for a story
const countLikes = async (req, res) => {
    const  movieId  = req.params.id;
    try {
        const likeCount = await Like.countDocuments({ movieId, liked: true });
        res.status(200).json({
            status: 200,
            msg: "Like count retrieved successfully",
            count: likeCount
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve like count",
            Error: err.message
        });
    }
};



// Create a new Reviews
const createReviews = async (req, res) => {
    const { movieId, review, userId } = req.body;

    if (!movieId || !review) {
        return res.status(400).json({
            status: 400,
            msg: 'movieId ID and Reviews are required.',
            data: null
        });
    }

    const newReviews = new Reviews({
        movieId,
        review,
        userId,
        date:new Date()
        
    });

    try {
        const savedReviews = await newReviews.save();
        res.status(200).json({
            status: 200,
            msg: "Inserted successfully",
            data: savedReviews
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.message
        });
    }
};

// View all Reviewss
const viewReviewssByMovie = (req, res) => {
    Reviews.find({movieId:req.params.id})
        .populate('userId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View Reviews by ID
const viewReviewsById = (req, res) => {
    Reviews.findById({ _id: req.params.id })
        .populate('movieId userId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

module.exports = {
    addLike,
      countLikes,
      createReviews,
      viewReviewsById,
      viewReviewssByMovie,
      
};
