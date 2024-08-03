const mongoose =require("mongoose");
const Properties=new mongoose.Schema({
name:{
    type:String,
    require:true
},
parameter:{
    type:String,
    require:true,
}
})
module.exports=mongoose.model("Properties",Properties)