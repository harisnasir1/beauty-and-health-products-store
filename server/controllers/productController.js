const products = require("../Models/Products");
const Categories = require("../Models/Categories");
const Properties = require("../Models/Properties");
const multiparty = require("multiparty");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

module.exports.add_products = async (req, res, next) => {
  try {
    const {
      Product_name,
      product_descripton,
      Region,
      product_price,
      qty,
      Images,
      property,
      Category,
    } = req.body;
    const propertyId = property?.length === 0 ? null : property;
    //console.log(propertyId)
    const name_check = await products.findOne({ Product_name });
    if (name_check) {
      return res.json({ msg: "prodcut Name Already Exists ", status: false });
    } else {
      //  //////console.log(product_descripton);
      const product = await products.create({
        Product_name,
        product_descripton,
        Region,
        product_price,
        qty,
        Images,
        property: propertyId,
        Category,
      });
      //////console.log("data from mongo :" ,product);
      return res.json({ status: false, product });
    }
  } catch (e) {
    //////console.log("error storing new product :",{e})
  }
};
module.exports.edit_products = async (req, res, next) => {
  try {
    const {
      Product_name,
      product_descripton,
      Region,
      product_price,
      id,
      qty,
      Images,
      Category,
      property,
    } = req.body;
    //console.log(Product_name,product_descripton,Region,product_price,qty,Images,property,Category);
    const propertyId = property?.length === 0 ? null : property;
    if (id) {
      const newProductData = {
        Product_name: Product_name,
        product_descripton: product_descripton,
        Region: Region,
        product_price: product_price,
        qty: qty,
        Images: Images,
        property: propertyId,
        Category: Category,
      };
      const updatedProduct = await products.findByIdAndUpdate(
        id,
        {
          $set: newProductData,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to the schema validation
        }
      );
      return res.json({ status: true, updatedProduct });
    } else {
      const r = "didnt get the id to the server";
      return res.json({ status: false, r });
    }
  } catch (e) {
    //////console.log("error updating  product :",{e})
  }
};
module.exports.del_products = async (req, res, next) => {
  try {
    ////console.log("deleting the product");
    const { id } = req.body;
    const r = await products.deleteOne({ _id: id });
    //////console.log("deleting the product",r);
    return res.jason({ status: true });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.showall_products = async (req, res, next) => {
  try {
    const allproducts = await products.find({}).populate("Category");
    
    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};
module.exports.All_products = async (req, res, next) => {
  try {
    const allproducts = await products
      .find({})
      .populate("Category")
      .sort({ _id: -1 });
    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};
module.exports.get_product = async (req, res, next) => {
  try {
    const { id } = req.body;
    const allproducts = await products.findOne({ _id: id });
    ////console.log("updaing", allproducts)
    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};
module.exports.get_sorted_product = async (req, res, next) => {
  try {
    const allproducts = await products.find({}, null, {
      sort: { _id: -1 },
      limit: 10,
    });

    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};

//Categories controllers
module.exports.Upload_Images = async (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async function (err, fields, files) {
    if (err) {
      ////console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form" });
    }

    try {
      cloudinary.config({
        cloud_name: process.env.cloudinary_cloud_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret_key,
      });

      const uploadPromises = files.file.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "Pro_ecommerce_website",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      const links = uploadResults.map((result) => result.secure_url);

      res.json({ links });
    } catch (uploadErr) {
      ////console.error("Error uploading to Cloudinary:", uploadErr);
      res.status(500).json({ error: "Error uploading to Cloudinary" });
    }
  });
};
module.exports.Del_cloud_Images = async (req, res, next) => {
  try {
    const { url } = req.body;

    cloudinary.config({
      cloud_name: process.env.cloudinary_cloud_name,
      api_key: process.env.cloudinary_api_key,
      api_secret: process.env.cloudinary_api_secret_key,
    });
    const public_key = url.split("/").pop().split(".")[0];
    console.log("we have the public id  ", public_key);

    const re=await cloudinary.uploader.destroy(`nidz_ecommerce_website/${public_key}`);
    console.log(re);
    res.json({ status: 200 });
  } catch (e) {
    res.json({ status: 404 })
  }
};
module.exports.Add_Categories = async (req, res, next) => {
  try {
    const { Catergoy_name, P, img } = req.body;

    if (!P && !img?.links) {
      //////console.log(Catergoy_name)
      const result = await Categories.create({
        Catergoy_name,
      });
      console.log("data from mongo :", result);
      return res.json({ status: true, result });
    } else if (!P && img?.links) {
      console.log("its right ");
      const result = await Categories.create({
        Catergoy_name,
        Img: img.links[0],
      });
      console.log("data from mongo :", result);
      return res.json({ status: true, result });
    } else if (P && !img?.links) {
      //////console.log(P)
      const r = await Categories.find({ Catergoy_name: P });
      //////console.log(r[0])
      const result = await Categories.create({
        Catergoy_name,
        parent: r[0]._id,
      });
      ////////console.log("data from mongo :" ,result);
      return res.json({ status: true, result });
      //////console.log(r);
    } else {
      const r = await Categories.find({ Catergoy_name: P });
      //////console.log(r[0])
      const result = await Categories.create({
        Catergoy_name,
        parent: r[0]._id,
        Img: img.links[0],
      });
      ////////console.log("data from mongo :" ,result);
      return res.json({ status: true, result });
    }
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.Getall_Categories = async (req, res, next) => {
  try {
    const result = await Categories.find({}).populate("parent");
    //////console.log("data from mongo of every categories :" ,result);
    return res.json({ status: true, result });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.del_categories = async (req, res, next) => {
  try {
    //////console.log("deleting the categories");
    const { id } = req.body;
    const r = await Categories.deleteOne({ _id: id });
    //////console.log("deleting the product",r);
    return res.jason({ status: true });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.edit_categories = async (req, res, next) => {
  try {
    const { Catergoy_name, P, id, img } = req.body;
    console.log(img);
    if (P != "no parent Category"&&img) {
      console.log("when we have both p and img")
      const r = await Categories.find({ Catergoy_name: P });
      const newData = {
        Catergoy_name: Catergoy_name,
        parent: r[0]._id,
        Img: img ? img : null,
      };
      //////console.log(Catergoy_name)
      const result = await Categories.findByIdAndUpdate(
        id,
        {
          $set: newData,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to the schema validation
        }
      );
      //console.log("data from mongo :" ,result);
      return res.json({ status: true, result });
    } else if (P == "no parent Category") {
      console.log("when we  img")

      const newData = {
        Catergoy_name: Catergoy_name,
        parent: null,
        Img: img ? img : null,
      };
      //////console.log(r[0])
      const result = await Categories.findByIdAndUpdate(
        id,
        {
          $set: newData,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to the schema validation
        }
      );
      ////console.log("data from mongo :" ,result);
      return res.json({ status: true, result });
    } else {
      //////console.log(P)
      const r = await Categories.find({ Catergoy_name: P });
      const newData = {
        Catergoy_name: Catergoy_name,
        parent: r[0]._id,
        Img: img ? img[0] : null,
      };
      //////console.log(r[0])
      const result = await Categories.findByIdAndUpdate(
        id,
        {
          $set: newData,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to the schema validation
        }
      );
      ////console.log("data from mongo :" ,result);
      return res.json({ status: true, result });
      //////console.log(r);
    }
  } catch (e) {}
};
module.exports.get_category = async (req, res, next) => {
  try {
    const { id } = req.body;
    const allproducts = await Categories.findOne({ _id: id }).populate(
      "parent"
    );
    ////////console.log("updaing", allproducts)
    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};

//properties Controllers
module.exports.Add_Properties = async (req, res, next) => {
  try {
    const { name, parameter } = req.body;

    ////console.log(name,parameter)
    const result = await Properties.create({
      name,
      parameter,
    });

    return res.json({ status: true, result });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.del_Properties = async (req, res, next) => {
  try {
    //////console.log("deleting the categories");
    const { id } = req.body;
    const r = await Properties.deleteOne({ _id: id });
    //////console.log("deleting the product",r);
    return res.jason({ status: true });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.edit_Properties = async (req, res, next) => {
  try {
    const { name, parameter, id } = req.body;
    //////console.log(id);
    if (id) {
      const newProperyData = {
        name,
        parameter,
      };
      const updatedProduct = await Properties.findByIdAndUpdate(
        id,
        {
          $set: newProperyData,
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to the schema validation
        }
      );
      return res.json({ status: true, updatedProduct });
    } else {
      const r = "didnt get the id to the server";
      return res.json({ status: false, r });
    }
  } catch (e) {
    //////console.log("error updating  product :",{e})
  }
};
module.exports.Getall_properties = async (req, res, next) => {
  try {
    ////console.log("atleast here");
    const result = await Properties.find({});
    ////console.log("data from mongo of every categories :" ,result);
    return res.json({ status: true, result });
  } catch (e) {
    return res.json({ status: false });
  }
};
module.exports.get_property = async (req, res, next) => {
  try {
    const { id } = req.body;
    const allproducts = await Properties.findOne({ _id: id });
    ////////console.log("updaing", allproducts)
    return res.json({ status: true, allproducts });
  } catch (error) {
    ////console.error('Error fetching products:', error);
  }
};
