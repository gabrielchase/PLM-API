const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { SALT_ROUNDS } = require('../config/config')
const { comparePassword } = require('./auth')
const { userInfoJson } = require('../lib/json_wrappers')
 
async function changeUserPassword(user_id, { old_password, new_password, confirm_password }) {
    if (new_password !== confirm_password) {
        throw new Error('Passwords do not match')
    }

    const user = await User.findById(user_id)
    const match = await comparePassword(old_password, user.password)

    if (!match)
        throw new Error('Invalid password')

    user.password = await bcrypt.hash(new_password, SALT_ROUNDS)
    user.temporary_password = false
    user.modified_on = new Date()

    await user.save()
    
    return true
}

async function updateUser(user_id, { email, username, full_name }) {
    const updated_user = await User.findOneAndUpdate(
        { _id: user_id }, 
        { email, username, full_name, modified_on: new Date() },
        { new: true }
    )
    return userInfoJson(updated_user)
}

async function getUser(user_id) {
    const user = await User.findById(user_id)
    return userInfoJson(user)
}

module.exports = {
    changeUserPassword,
    updateUser,
    getUser
}