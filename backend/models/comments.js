import mongoose from 'mongoose'

const comment = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId
    },
    user:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Comment = mongoose.model('comment', comment)

export default Comment

