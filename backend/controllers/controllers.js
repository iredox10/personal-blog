import Blog from "../models/blogs.js"
import Category from "../models/category.js"
import cloudinary from "../utils/cloudinary.js"


export const create_category = async (req,res)=>{
    const imageStr = req.body.logo  
        const uploadedResponse = await cloudinary.uploader.upload(imageStr,{
            upload_preset: 'blog_images'
        })
    try{
        const category = await Category.create({
            name: req.body.name,
            shortName: req.body.shortName,
            color: req.body.color,
            desc: req.body.desc,
            logo: uploadedResponse.secure_url
        })
        res.json(category)
    }catch(err){
        res.json(err)
    }
}

export const update_category = async (req,res)=>{
    try{
        const category = await Category.findOneAndUpdate({slug:req.params.slug},req.body,{new:true})
        // const category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(category)
    }catch(err){
        res.json(err)
    }
}

export const delete_category = async (req,res)=>{
    try{
        const category = await Category.findOneAndDelete({slug:req.params.slug})
        res.json(category)
    }catch(err){
        res.json(err)
    }
}

export const get_category = async (req,res)=>{
    try{
        const categoryBlogs = await Category.findOne({slug:req.params.slug}).populate('blogs')
        res.json(categoryBlogs)
    }catch(err){
        res.json(err)
    }
}

export const get_categories = async (req,res)=>{
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(err){
        res.json(err)
    }
}

