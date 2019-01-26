const { checkJWT, checkPostUser } = require('../middlewares')
const { success, fail } = require('../lib/json_wrappers')
const { 
    createPost, 
    updatePost, 
    deletePost, 
    getUserPosts, 
    getPosts 
} = require('../actions/post')

module.exports = function(app) {
    app.post('/api/posts', checkJWT, async (req, res) => {
        try {
            const new_post = await createPost(req.user._id, req.body)
            success(res, new_post)
        } catch (err) {
            fail(res, err)
        }
    })

    app.put('/api/posts/:post_id', checkJWT, checkPostUser, async (req, res) => {
        const { post_id } = req.params
        try {
            const updated_post = await updatePost(post_id, req.body)
            success(res, updated_post)
        } catch (err) {
            fail(res, err)
        }
    })

    app.delete('/api/posts/:post_id', checkJWT, checkPostUser, async (req, res) => {
        const { post_id } = req.params
        try {
            const deleted = await deletePost(post_id)
            if (deleted)
                success(res)
            else 
                throw new Error('Post deletion failed')
        } catch (err) {
            fail(res, err)
        }
    })

    app.get('/api/posts', async (req, res) => {
        const { query } = req
        try {
            const posts = await getPosts(query)
            success(res, posts)
        } catch (err) {
            fail(res, err)
        }
    })

    app.get('/api/user/:user_id/posts', async (req, res) => {
        const { user_id } = req.params
        try {
            const user_posts = await getUserPosts(user_id)
            success(res, user_posts)
        } catch (err) {
            fail(res, err)
        }
    })
}
