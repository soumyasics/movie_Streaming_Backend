const multer = require('multer');
const Movie = require('./movieSchema');
const castSchema = require('./castSchema');

// Configure storage for pictures and videos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'prefix-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = `${uniquePrefix}${originalname.substring(0, originalname.lastIndexOf('.'))}-${Date.now()}.${extension}`;
        cb(null, filename);
    }
});
const uploadSingle = multer({ storage: storage }).single("image")
const upload = multer({ storage: storage }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const { files, body } = req;

        const movie = new Movie({
            ...body,
            thumbnail: files.thumbnail ? files.thumbnail[0] : null,
            video: files.video ? files.video[0] : null,
        });

        const savedMovie = await movie.save();
        res.status(201).json({
            status: 200,
            message: 'Movie created successfully',
            data: savedMovie
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

// Get all approved movies
const getApprovedMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ isActive: true });
        res.status(200).json({
            status: 200,
            message: 'Approved movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get all movies pending approval
const getMoviesForApproval = async (req, res) => {
    try {
        const movies = await Movie.find({ adminApproved: false });
        res.status(200).json({
            status: 200,
            message: 'Movies pending approval retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};



// Get all movies pending approval
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            status: 200,
            message: 'Movies pending approval retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
// Get a single movie by ID
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ 
            status: 404, 
            message: 'Movie not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movie retrieved successfully',
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Update a movie by ID
const updateMovieById = async (req, res) => {
    try {
        const { files, body } = req;

        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ 
            status: 404, 
            message: 'Movie not found' 
        });

        Object.assign(movie, body);
        if (files.thumbnail) {
            movie.thumbnail = files.thumbnail[0];
        }
        if (files.video) {
            movie.video = files.video[0];
        }

        const updatedMovie = await movie.save();
        res.status(200).json({
            status: 200,
            message: 'Movie updated successfully',
            data: updatedMovie
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

// Approve a movie by ID
const approveMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {adminApproved:true,isActive: true }, { new: true });
        if (!movie) return res.status(404).json({ 
            status: 404, 
            message: 'Movie not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movie approved successfully',
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
    try {
        const movies = await Movie.find({ genre: req.params.genre });
        if (!movies || movies.length === 0) return res.status(404).json({ 
            status: 404, 
            message: 'Movies not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get movies by director
const getMoviesByDirector = async (req, res) => {
    try {
        const movies = await Movie.find({ director: req.params.director });
        if (!movies || movies.length === 0) return res.status(404).json({ 
            status: 404, 
            message: 'Movies not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get movies by director
const getMoviesByLanguage = async (req, res) => {
    try {
        const movies = await Movie.find({ language: req.params.language });
        if (!movies || movies.length === 0) return res.status(404).json({ 
            status: 404, 
            message: 'Movies not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Delete a movie by ID
const deleteMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ 
            status: 404, 
            message: 'Movie not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

const addCast=async(req,res)=>{
    try{
    const casts=new castSchema({
        name:req.body.name,
        movieId:req.params.id,
        image:req.file

    })
    const savedMovie=await casts.save()
    res.status(201).json({
        status: 200,
        message: 'Movie created successfully',
        data: savedMovie
    });
} catch (error) {
    res.status(400).json({
        status: 400,
        message: error.message
    });
}
}

// Get movies by director
const getCastBYMovieId = async (req, res) => {
    try {
        const movies = await castSchema.find({ movieId: req.params.id });
        if (!movies || movies.length === 0) return res.status(404).json({ 
            status: 404, 
            message: 'Movies not found' 
        });
        res.status(200).json({
            status: 200,
            message: 'Movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
module.exports = {
    createMovie,
    upload,
    updateMovieById,
    getMovieById,
    getApprovedMovies,
    getMoviesForApproval,
    approveMovieById,
    getMoviesByGenre,
    getMoviesByDirector,
    deleteMovieById,
    addCast,
    uploadSingle,
    getMoviesByLanguage,
    getCastBYMovieId,
    getAllMovies
};
