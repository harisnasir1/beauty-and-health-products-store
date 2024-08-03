const admin=require("../Models/Dashboard_Login")
const bycrypt=require("bcrypt")
module.exports.login_admin=async(req,res,next)=>{
    try{       
        const{UserName,Password,}=req.body;
        const user=await admin.findOne({UserName});
       
        if(!user){
           return  res.json({msg:"Incorrect User Name or password",status:false});
        }
        const passhashcheck=await bycrypt.compare(Password,user.Password);
        if(!passhashcheck)
        {
       return res.json({msg:"Incorrect  password",status:false});

        }
   
        delete user;
        return res.json({status:true,user});

      
        

    }
    catch(err){
        next(err);
    }
}
module.exports.signup_admin=async(req,res,next)=>{
    try{
        console.log("i am here");
        
        const{UserName, Email,Password,}=req.body;
        const usernamecheck=await admin.findOne({UserName});
        const emailnamecheck=await admin.findOne({Email});
   
        if(usernamecheck){
          return  res.json({msg:"UserName Already Exists ",status:false});
        }
        else if(emailnamecheck){
          return  res.json({msg:"Email  Already Exists ",status:false});
        }
else{

 
        const hashedpass=await bycrypt.hash(Password,13);
        const user=await admin.create({
            UserName,
             Email,
             Password:hashedpass,
        })
       
        delete user.Password;
        return res.json({status:true,user});
}
    }
    catch(err){
        next(err);
    }
}