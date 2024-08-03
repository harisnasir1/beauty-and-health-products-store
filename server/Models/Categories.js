const mongoose =require("mongoose")
const Categories =new mongoose.Schema(
    {
      Catergoy_name:{
        type:String,
        require:true,
      },
      parent:{
       type:mongoose.Types.ObjectId,
       ref:'Category'
      },
      Img:{
        type:String,
        default:null,
      }
    }
)
module.exports=mongoose.model("Category",Categories )