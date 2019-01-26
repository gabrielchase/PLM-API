const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    category: { 
        type: String, 
        enum: ['NEWS', 'FEATURES', 'SPORTS', 'EDITORIAL', 'LITERARY', 'ANNOUNCEMENTS'] 
    },
    user_id: { type: String},

    created_on: { type: Date, default: Date.now },
    modified_on: { type: Date },
    deleted_on: { type: Date }
})

module.exports = mongoose.model('Post', PostSchema)
