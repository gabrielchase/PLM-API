const jwt = require('jsonwebtoken')
const Post = require('../models/Post')
const { checkJWTExpiration } = require('../lib/utils')
const { fail } = require('../lib/json_wrappers')

module.exports = {
    checkIfUserIsAdmin: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = await jwt.decode(token)

            if (user.admin)
                next()
            else 
                throw new Error('Invalid credentials')        
        } catch (err) {
            fail(res, err)
        }
    },
    checkUser: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = await jwt.decode(token)

            if (user._id === req.params.user_id) {
                next()    
            }
            else 
                throw new Error('Invalid credentials')
        } catch (err) {
            fail(res, err)
        }
    },
    checkJWT: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const user = await jwt.decode(token)

            await checkJWTExpiration(user.exp)

            if (user) {
                req.user = user
                next() 
            } else {
                throw new Error('Invalid JWT')
            }   
        } catch (err) {
            fail(res, err)
        }
    },
    checkPostUser: async (req, res, next) => {
        const { post_id } = req.params 
        try {
            const post = await Post.findById(post_id)
            
            if (post.user_id === req.user._id)
                next ()
            else 
                throw new Error('Invalid Credentials')
        } catch (err) {
            fail(res, err)
        }
    }
}
