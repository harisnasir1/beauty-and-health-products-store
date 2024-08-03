const Home=require('../Models/Home_Cus');
const products=require('../Models/Products')
module.exports.HomeCustomization=async(req,res,next)=>{
const {Bannerfirst,BannerSecond,TrendingList}=req.body;
console.log(Bannerfirst);
console.log(BannerSecond);
let ids=[];
for(let i =0;i<TrendingList?.length;i++)
    {
        ids.push(TrendingList[i]._id);
    }
  const result=await  Home.create({
        Feautured_First:'66ae6e62590a6ce14ff66ac9'    ,
        Feautured_Second: '66ae69b4590a6ce14ff66a51'  ,
        Trending_products:ids  ,
    });
   


res.json({status:200})

}
module.exports.Getfeaturedproducts=async(req,res,next)=>{

   try{
    //console.log("comming")
    const r= await Home.find({}).populate('Trending_products').populate('Feautured_First').populate('Feautured_Second').sort({_id:-1}).limit(1);
   // console.log(r);
  return  res.json({status:true,r})
   }
   catch(e)
   {
    console.log("error",e);
   }
}