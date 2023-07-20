import mongoose from 'mongoose'
const connectMongoose = async() =>{
    try{
        await mongoose.connect('mongodb://localhost/personal-blog')
        console.log('connected to the database')
    }catch(err){
        console.log(err)
    }
}

export default connectMongoose