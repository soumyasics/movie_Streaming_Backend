const express = require('express');

const History = require('./historySchema');





// Create a new Reviews
const addHistory = async (req, res) => {
    const { movieId, userId } = req.body;

    if (!movieId || !review) {
        return res.status(400).json({
            status: 400,
            msg: 'movieId ID and Reviews are required.',
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
    History.find({userid:req.params.id})
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

module.exports = {
    
      addHistory,
      viewHistioryByMovieId,
      viewHistoryByUserId,
      
};
