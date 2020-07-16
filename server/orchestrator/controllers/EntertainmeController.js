const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const tvService = process.env.TV_SERIES_SERVICES_PATH;
const moviesService = process.env.MOVIES_SERVICES_PATH;

class EntertainmeController {
    static async index(req, res){
        try{
            const movieCache = await redis.get("movies");
            const tvCache = await redis.get("tvSeries");
            if(movieCache && tvCache){
                res.status(200).json({
                    movies: JSON.parse(movieCache),
                    tvSeries: JSON.parse(tvCache)
                })
            }else{
                const { data: movies } = await axios.get(moviesService);
                const { data: tvSeries } = await axios.get(tvService);
                res.status(200).json({
                    movies,
                    tvSeries
                })
            }
        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
}

module.exports = EntertainmeController