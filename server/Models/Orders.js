const mongoose=require('mongoose')
const Orders= new mongoose.Schema({
    line_items:Object,
    name:String,
    email:String,
    city:String,
    postalcode:String,
    country:String,
    street_address:String,
    paid:Boolean,
    tprice:Number,
},{
    timestamps:true,
})
module.exports=mongoose.model("Orders",Orders);