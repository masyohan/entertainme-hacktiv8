const db = require('../config/mongo');
const TvSeries = db.collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class TvModel {
    static findAll(){
        return TvSeries.find().toArray();
    }
    static find(id){
        return TvSeries.findOne({ _id: ObjectId(id) });
    }
    static create(tvSeries){
        return TvSeries.insertOne(tvSeries);
    }
    static update(id, updateTvSeries){
        return TvSeries.updateOne({ _id: ObjectId(id) },{ $set: updateTvSeries});
    }
    static delete(id){
        return TvSeries.deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = TvModel