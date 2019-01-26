const Post = require('../models/Post')

async function createPost(user_id, { title, body, category }) {
    const new_post = await new Post({ 
        title, 
        body,
        category,
        user_id
    })
    await new_post.save()
    return new_post
}

async function updatePost(post_id, { title, body, category }) {
    let post = await Post.findById(post_id)
    post.title = title
    post.body = body
    post.category = category
    post.modified_on = new Date()
    await post.save()
    return post
}

async function deletePost(post_id) {
    let post = await Post.findById(post_id)
    post.deleted_on = new Date()
    post.save()
    return true 
}

async function getUserPosts(user_id) {
    return await Post.find({ user_id, deleted_on: null })
}

async function getPosts(query) {
    query.deleted_on = null
    if (query.title) {
        query.title = { $regex: `${query.title}`}
    }
    return await Post.find(query)
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getUserPosts,
    getPosts
}