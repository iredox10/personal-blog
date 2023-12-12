import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const signToken = ({id:id,isAdmin:isAdmin}) => {
    return jwt.sign({id,isAdmin}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

export const signup = async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 6)
        const user = await User.create({
            fullName: req.body.fullName,
            username: req.body.username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        })
        const token = signToken(user._id,user.isAdmin)
        res.status(201).json({user,token})
    }catch(err){
        res.status(400).json(err)
    }
}

export const login = async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            throw new Error('Incorrect password')
        }
        const token = signToken(user._id,user.isAdmin)
        res.status(201).json({user,token})
    }catch(err){
        res.status(400).json(err)
    }
}

export const get_users = async(req,res) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.json(err.message)
    }
}