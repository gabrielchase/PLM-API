const { registerUser, loginUser } = require('../actions/auth')
const { changeUserPassword, updateUser, getUser } = require('../actions/user')
const { checkIfUserIsAdmin, checkUser } = require('../middlewares')
const { success, fail } = require('../lib/json_wrappers')

module.exports = function (app) {
    app.post('/api/auth/login', async (req, res) => {
        try {
            const auth_credentials = await loginUser(req.body)
            success(res, auth_credentials)
        } catch (err) {
            fail(res, err)
        }
    })

    app.post('/api/user', checkIfUserIsAdmin, async (req, res) => {
        try {
            const new_user = await registerUser(req.body)
            success(res, new_user)
        } catch (err) {
            fail(res, err)
        }
    })

    app.put('/api/user/:user_id', checkUser, async (req, res) => {
        const { user_id } = req.params
        try {
            const updated_user = await updateUser(user_id, req.body)
            success(res, updated_user)
        } catch (err) {
            fail(res, err)
        }
    })

    app.put('/api/user/:user_id/password', checkUser, async (req, res) => {
        const { user_id } = req.params
        try {
            const changed = await changeUserPassword(user_id, req.body)
            
            if (changed)
                success(res)
            else 
                throw new Error('Change password failed')
        } catch (err) {
            fail(res, err)
        }
    })

    app.get('/api/user/:user_id', async (req, res) => {
        const { user_id } = req.params
        try {
            const user = await getUser(user_id)
            success(res, user)
        } catch (err) {
            fail(res, err)
        }
    })
}
