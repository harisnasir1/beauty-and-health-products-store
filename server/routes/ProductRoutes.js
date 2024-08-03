const {add_products,edit_products,del_products,showall_products,get_product,
    Upload_Images,Add_Categories,Getall_Categories,del_categories,get_category,edit_categories,
    Add_Properties,del_Properties,edit_Properties,Getall_properties,get_property,get_sorted_product,All_products,Del_cloud_Images
}=require("../controllers/productController")
const express = require("express");
const router = express.Router();

router.post("/add_products",add_products);
router.post("/edit_products",edit_products);
router.post("/del_products",del_products);
router.get("/showall_products",showall_products);
router.get("/All_products",All_products);
router.post("/get_product",get_product);
router.get("/get_sorted_product",get_sorted_product);


router.post("/Upload_Images",Upload_Images);
router.post("/Del_cloud_Images",Del_cloud_Images);
router.post("/Add_Categories",Add_Categories);
router.get("/Getall_Categories",Getall_Categories);
router.post("/del_categories",del_categories);
router.post("/get_category",get_category);
router.post("/edit_categories",edit_categories);
router.post("/Add_Properties",Add_Properties);
router.post("/del_Properties",del_Properties);
router.post("/edit_Properties",edit_Properties);
router.get("/Getall_properties",Getall_properties);
router.post("/get_property",get_property);


module.exports=router;