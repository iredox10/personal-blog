import Comment from '../models/comments.js'

export const createComment = async (req,res)=>{
    try{
        const comment = await Comment.create({
            comment: req.body.comment,
            user: req.body.user
        })
        res.status(201).json(comment)
    }catch(err){
        res.status(400).json(err)
    }
}
