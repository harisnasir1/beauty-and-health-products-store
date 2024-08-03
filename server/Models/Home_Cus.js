const mongoose =require('mongoose');
const products=require('../Models/Products')
const Home= new mongoose.Schema({
    Feautured_First:{
        type:mongoose.Types.ObjectId,
        ref:'products',
    },
    Feautured_Second:{
        type:mongoose.Types.ObjectId,
        ref:'products',
    },
    Trending_products:{
        type:[mongoose.Types.ObjectId],
        ref:'products',
    }
},{
    timestamps:true,
})

module.exports=mongoose.model('Home',Home)