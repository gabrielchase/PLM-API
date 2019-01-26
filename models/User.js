const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false},
    full_name: { type: String },
    temporary_password: { type: Boolean, default: true },

    created_on: { type: Date, default: Date.now },
    modified_on: { type: Date },
    deleted_on: { type: Date }
})

UserSchema.statics.getByEmail = async function(email) {
    return await this.findOne({ email })
}

UserSchema.statics.getByUsername = async function(username) {
    return await this.findOne({ username })
}

module.exports = mongoose.model('User', UserSchema)
