import Blog from "../models/blogs.js"
import Category from "../models/category.js"
import cloudinary from "../utils/cloudinary.js"

export const create_blog = async (req,res)=>{
    try{
        const imageStr = req.body.image
        const uploadedResponse = await cloudinary.uploader.upload(imageStr,{
            upload_preset: 'blog_images'
        })
        console.log(uploadedResponse);
        const category = await Category.findOne({slug:req.params.slug})
        const blog = await Blog.create({
            title: req.body.title,
            subtitle: req.body.subtitle,
            summary: req.body.summary,
            image: uploadedResponse.secure_url,
            blog: req.body.blog,
            author: req.body.author,
            category: req.body.category
            // category: req.body.category._id
        })
        category.blogs.push(blog._id)
        await category.save()
        res.status(201).json({blog,category})
    }catch(err){
        res.status(400).json(err)
    }
}

export const update_blog = async (req,res)=>{
    try{
        const blog = await Blog.findOneAndUpdate({slug:req.params.slug},req.body,{new:true})
        res.json(blog)
    }catch(err){
        res.json(err)
    }
}

export const delete_blog = async (req,res)=>{
    try{
        const blog = await Blog.findOne({slug:req.params.slug})
        const category = await Category.findOne({slug:req.params.cSlug})
        await category.blogs.pull(blog._id)
        await Blog.findOneAndDelete({slug:req.params.slug})
        res.status(200).json({blog,category})
    }catch(err){
        res.status(400).json(err)
    }
}

export const get_blog = async (req,res)=>{
    try{
        const blog = await Blog.findOne({slug:req.params.slug})
        res.json(blog)
    }catch(err){
        res.json(err)
    }
}

export const get_blogs = async (req,res)=>{
    try{
        const blogs = await Blog.find()
        res.json(blogs)
    }catch(err){
        res.json(err)
    }
}

export const get_blogs_by_category = async (req,res)=>{
    try{
        const category = await Category.findOne({slug:req.params.slug})
        const blogs = await Blog.find({_id:{$in:category.blogs}})
        res.json(blogs)
    }catch(err){
        res.json(err)
    }
}

export const get_categories_with_blogs = async (req,res)=>{
    try{
        const categories = await Category.find().populate('blogs')
        res.json(categories)
    }catch(err){
        res.json(err)
    }
}

export const get_category_with_blogs = async (req,res)=>{
    try{
        const category = await Category.findOne({slug:req.params.slug}).populate('blogs')
        res.json(category)
    }catch(err){
        res.json(err)
    }
}

