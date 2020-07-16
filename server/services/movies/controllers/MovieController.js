const MovieModel = require('../models/movie');

class MovieController {

    static async findAll(req, res){
        try{
            const movies = await MovieModel.findAll()
            res.status(200).json(movies);
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async findById(req, res){
        try{
            const movie = await MovieModel.find(req.params.id);
            if(movie){
                res.status(200).json(movie);
            }else{
                res.status(404).json({message: "Movie Not Found"})
            }
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async create(req, res){
        try{
            const movie = await MovieModel.create(req.body);
            res.status(201).json(movie.ops[0]);
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async delete(req, res){
        try{
            const deleted = await MovieModel.delete(req.params.id);
            res.status(200).json({message: "Success Deleted Movie"});
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async update(req, res){
        try{
            const updated = await MovieModel.update(req.params.id, req.body);
            res.status(200).json({
                message: 'Movie updated',
                movie: {id: req.params.id,...req.body}
            });
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }

}

module.exports = MovieController;