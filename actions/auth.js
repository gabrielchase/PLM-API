const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { JWT_SECRET, JWT_EXPIRATION, SALT_ROUNDS } = require('../config/config')
const { newUserJson, loginCredentialsJson } = require('../lib/json_wrappers')

async function registerUser({ email, username, full_name, admin }) {
    const hashed_password = await bcrypt.hash('iloveplm', SALT_ROUNDS)
    const new_user = await new User({
        email, 
        username,
        full_name,
        password: hashed_password,
        temporary_password: true, 
        admin
    })
    await new_user.save()
    console.log('New user created: ', new_user)

    return newUserJson(new_user)
}

async function loginUser({ email, username, password }) {
    console.log('Logging in: ', email, username, password)
    let user = {}
    
    if (email && !username) {
        user = await User.getByEmail(email)
    } else if (username && !email) {
        user = await User.getByUsername(username)
    }

    const match = await comparePassword(password, user.password)

    if (match) {
        const jwt_credentials = await getJWTCredentials(user)
        const login_credentials = await loginCredentialsJson(user, jwt_credentials)
        return login_credentials
    } else {
        throw new Error('Invalid credentials')
    }
}

async function comparePassword(given_password, user_password) {
    return await bcrypt.compare(given_password, user_password)
}

async function getJWTCredentials({ _id, email, username, full_name, admin }) {
    const signed_jwt = jwt.sign(
        { _id, email, username, full_name, admin }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRATION }
    )
    const { iat, exp } = jwt.verify(signed_jwt, JWT_SECRET)
    return { 
        token: signed_jwt,
        iat, 
        exp
    }
}

module.exports = {
    registerUser,
    loginUser,
    comparePassword
}
