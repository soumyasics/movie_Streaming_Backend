const express = require('express');

const History = require('./historySchema');
const Movie=require('../Movies/movieSchema')




// Create a new Reviews
const addHistory = async (req, res) => {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
        return res.status(400).json({
            status: 400,
            msg: 'movieId ID and userId are required.',
            data: null
        });
    }

    const newReviews = new History({
        movieId,
       
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

// View all historyByUser
const viewHistoryByUserId = (req, res) => {
    History.find({userId:req.params.id})
        .populate('movieId')
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
const viewHistioryByMovieId = (req, res) => {
    Reviews.find({ movieId: req.params.id })
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
// Get 10 recently played movies
const getRecentlyPlayedMovies = async (req, res) => {
    try {
        const recentlyPlayedMovies = await History.find()
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .limit(10) // Limit to 10 results
            .populate('movieId'); // Populate movie details

        res.status(200).json({
            status: 200,
            message: 'Recently played movies retrieved successfully',
            data: recentlyPlayedMovies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};



const getSuggestedMovies = async (req, res) => {
    const userId = req.params.userId;
console.log(userId);
    try {
        
        const recentHistory = await History.findOne({ userId })
            .sort({ createdAt: -1 })
            .populate('movieId')
            .exec();

        if (!recentHistory || !recentHistory.movieId) {
            return res.status(404).json({
                status: 404,
                message: 'No recently played movie found for this user',
            });
        }

        const recentMovie = recentHistory.movieId;
        const { genre, language } = recentMovie;

        const userHistory = await History.find({ userId }).select('movieId');
        const watchedMovieIds = userHistory.map(history => history.movieId);

        const suggestedMovie = await Movie.find({ //updated by radhul
            genre, 
            language,
            _id: { $nin: watchedMovieIds },
            isActive: true,
            adminApproved: true
        })
        .sort({ rating: -1 })
        .exec();

        if (!suggestedMovie) {
            return res.status(404).json({
                status: 404,
                message: 'No suggested movie found with the same genre and language',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Suggested movie retrieved successfully',
            data: suggestedMovie,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};






module.exports = {
    
      addHistory,
      viewHistioryByMovieId,
      viewHistoryByUserId,
      getRecentlyPlayedMovies,
      getSuggestedMovies
      
};
