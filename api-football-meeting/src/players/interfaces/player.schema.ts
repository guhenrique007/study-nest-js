import * as mongoose from 'mongoose'

export const playerSchema = new mongoose.Schema({
    phoneNumber: {type: String, unique: true},
    email: {type: String},
    name: String,
    ranking: String,
    positionRanking: Number,
    urlProfilePhoto: String,
}, {timestamps: true, collection: 'players'});

