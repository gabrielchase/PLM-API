const jwt = require('jsonwebtoken')
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

            if (user._id === req.params.user_id)
                next()    
            else 
                throw new Error('Invalid credentials')
        } catch (err) {
            fail(res, err)
        }
    }
}
