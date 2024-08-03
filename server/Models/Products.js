const mongoose = require ("mongoose");
const Categories = require("./Categories");
const properties= require("./Properties")
const products= new mongoose.Schema({
    Product_name:{
        type:String,
        require:true,
        min:3,
        max:30,
        unique:true,
    },
    product_descripton:{
        type:String,
        require:true,      
    },
    Region:{
        type:String,
    },
    product_price:{
        type:String,
        require:true,
    },
    qty:{
        type:String,
        require:true,
        
    },
    Images:{
        type:[String],
    },
    property:{
        type:mongoose.Types.ObjectId,
        ref:'Properties',
        default:null
    },

    Category:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
    },
    

},{timestamps:true})
module.exports=mongoose.model("products",products);