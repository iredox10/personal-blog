import Comment from '../models/comments.js'
import Blog from "../models/blogs.js";
import User from '../models/user.js';

export const post_comment = async (req,res)=>{
    const blog = await Blog.findOne({slug: req.params.slug})
    const user = await User.findOne({username: req.body.username})
    try{
        const comment = await Comment.create({
            comment: req.body.comment,
            user: user.username,
            blog
        })
        user.comments.push(comment)
        blog.comments.push(comment)
        user.save()
        blog.save()
        res.status(201).json(comment)
    }catch(err){
        res.status(400).json(err.message)
    }
}


export const get_comments = async (req,res)=>{
    try {
        const blog = await Blog.findOne({slug: req.params.slug}).populate('comments')
        res.status(200).json({comments: blog.comments})        
    } catch (err) {
        res.status(404).json(err.message)
    }
}