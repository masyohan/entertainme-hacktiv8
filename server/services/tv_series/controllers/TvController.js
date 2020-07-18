const TvModel = require('../models/TvSeries');

class TvController {

    static async findAll(req, res){
        try{
            const tvSeries = await TvModel.findAll()
            res.status(200).json(tvSeries);
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async findById(req, res){
        try{
            const tvSeries = await TvModel.find(req.params.id);
            if(tvSeries){
                res.status(200).json(tvSeries);
            }else{
                res.status(404).json({message: "Tv Series Not Found"})
            }
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async create(req, res){
        try{
            const tvSeries = await TvModel.create(req.body);
            res.status(201).json(tvSeries.ops[0]);
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async delete(req, res){
        try{
            const deleted = await TvModel.delete(req.params.id);
            res.status(200).json({message: "Success Deleted Tv Series"});
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }
    static async update(req, res){
        try{
            const updated = await TvModel.update(req.params.id, req.body);
            res.status(200).json({
                message: 'Tv Series updated',
                tv_series: updated.value
            });
        }catch(err){
            res.status(500).json({message: "Internal Server Error"});
        }
    }

}

module.exports = TvController;