const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const baseURL = process.env.MOVIES_SERVICES_PATH;

class MovieController {
    static async findAll(req, res){
        try{
            let result
            const moviesCache = await redis.get("movies");
            if(moviesCache){
                result = JSON.parse(moviesCache);
            }else{
                const { data } = await axios.get(`${baseURL}`);
                result = data;
                redis.set("movies", JSON.stringify(data));
            }
            res.status(200).json(result);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async findByid(req, res){
        try{
            const movieById = await redis.hget("moviesHash",req.params.id);
            if(movieById){
                res.status(200).json(JSON.parse(movieById));
            }else{
                const { data } = await axios.get(`${baseURL}/${req.params.id}`);
                redis.hset("moviesHash", req.params.id, JSON.stringify(data));
                res.status(200).json(data);
            }
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async create(req, res){
        try{
            const newMovie = req.body;
            const { data } = await axios.post(`${baseURL}`, newMovie);
            redis.del("movies")
            res.status(201).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async delete(req, res){
        try{
            const { data } = await axios.delete(`${baseURL}/${req.params.id}`);
            redis.hdel("moviesHash", req.params.id);
            redis.del("movies")
            res.status(200).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async update(req, res){
        try{
            const updateMovie = req.body;
            const { data } = await axios.put(`${baseURL}/${req.params.id}`, updateMovie);
            redis.hset("moviesHash", req.params.id, JSON.stringify(data));
            redis.del("movies")
            res.status(200).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
}

module.exports = MovieController