const db = require('../config/mongo');
const Movie = db.collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class MovieModel {
    static findAll(){
        return Movie.find().toArray();
    }
    static find(id){
        return Movie.findOne({ _id: ObjectId(id) });
    }
    static create(movie){
        return Movie.insertOne(movie);
    }
    static update(id, updateMovie){
        return Movie.findOneAndUpdate({ _id: ObjectId(id) },{ $set: updateMovie}, {returnOriginal: false});
    }
    static delete(id){
        return Movie.deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = MovieModel