const express=require('express');
const {HomeCustomization,Getfeaturedproducts}=require('../controllers/Home')
const router=express.Router();
router.post('/HomeCustomization',HomeCustomization);
router.get('/Getfeaturedproducts',Getfeaturedproducts);
module.exports=router;