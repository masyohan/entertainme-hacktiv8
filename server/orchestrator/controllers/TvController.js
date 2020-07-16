const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const baseURL = process.env.TV_SERIES_SERVICES_PATH;

class TvController {
    static async findAll(req, res){
        try{
            let result;
            const tvCache = await redis.get("tvSeries");
            if(tvCache){
                result = JSON.parse(tvCache);
            }else{
                const { data } = await axios.get(`${baseURL}`);
                result = data;
                redis.set("tvSeries", JSON.stringify(data));
            }
            res.status(200).json(result);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async findByid(req, res){
        try{
            const tvCacheById = await redis.hget("tvSeriesHash",req.params.id);
            if(tvCacheById){
                res.status(200).json(JSON.parse(tvCacheById));
            }else{
                const { data } = await axios.get(`${baseURL}/${req.params.id}`);
                redis.hset("tvSeriesHash", req.params.id, JSON.stringify(data));
                res.status(200).json(data);
            }
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async create(req, res){
        try{
            const newTv = req.body;
            const { data } = await axios.post(`${baseURL}`, newTv);
            redis.del("tvSeries");
            res.status(201).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async delete(req, res){
        try{
            const { data } = await axios.delete(`${baseURL}/${req.params.id}`);
            redis.hdel("tvSeriesHash", req.params.id);
            redis.del("tvSeries");
            res.status(200).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
    static async update(req, res){
        try{
            const updateTv = req.body;
            const { data } = await axios.put(`${baseURL}/${req.params.id}`, updateTv);
            redis.hset("tvSeriesHash", req.params.id, JSON.stringify(data));
            redis.del("tvSeries");
            res.status(200).json(data);
        }catch(err){
            res.status(err.response.status).json(err.response.data);
        }
    }
}

module.exports = TvController