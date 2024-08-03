const products =require("../Models/Products");
const Categories =require("../Models/Categories")
const Properties=require("../Models/Properties")
const Orders=require("../Models/Orders")
const multiparty = require('multiparty');
const cloudinary=require('cloudinary').v2
const dotenv=require("dotenv");
const { model } = require("mongoose");
const {buffer}=require('micro')
const getRawBody = require('raw-body');
dotenv.config();
const stripe = require('stripe')(process.env.stipe_sk);

module.exports.getcartproduct=async(req,res,next)=>{
    try {
        const{id}=req.body;
        const result = await products.find({_id:id}).populate('property');
        const allproducts = result.map(product => ({
            _id: product._id,
            Product_name: product.Product_name,
            Images:product.Images,
            qty:product.qty,
            product_price:product.product_price,
            property: product.property ? {
                name: product.property.name,
                parameters: product.property.parameter.split(',').map(param => param.trim())  // Split the parameter string and trim whitespace
            } : null
        }));
        return res.json({status:true,allproducts});
    } catch (error) {
        ////console.error('Error fetching products:', error);
    }
}
module.exports.getcartProperties=async(req,res,next)=>{
    try {
        const{id}=req.body;
        const allproducts = await Properties.find({_id:id});
      
        return res.json({status:true,allproducts});
    } catch (error) {
        ////console.error('Error fetching products:', error);
    }
}
module.exports.addCart=async(req,res,next)=>{
    try {
        const { select_cartpros, cartpoducts, billingdata } = req.body;

        // Fetch products from the database
        ////console.log('Fetching products...');
        const result = await products.find({ _id: { $in: cartpoducts } }).populate('property');
       // //console.log('Products fetched:', result);

        let line_items = [];
        let tprice=0;
        result.map((product) => {
            const quantity = cartpoducts.filter(id => id == product._id).length; // Get the quantity for every product
            const pro = select_cartpros[product._id]; // Get the property
            const unit_amount = product.product_price; // Convert price to cents
            tprice=tprice+(parseInt(product.product_price)*quantity)
           
            line_items.push({
                quantity,
                price_data: {
                    currency: 'usd',
                    product_data: { name: product.Product_name },
                    unit_amount:  product.product_price // Use 'unit_amount' in cents
                },
                property: {
                    parameter: pro ? pro.parameter : null,
                    property_id: pro ? pro.name : null,
                }
            });
        });

        // Log the line items for debugging
       // //console.log('prices:',  tprice);

        // Create the order in the database
       // //console.log('Creating order...');
        const orderinfo = await Orders.create({
            line_items,
            name: billingdata.name,
            email: billingdata.email,
            city: billingdata.city,
            postalcode: billingdata.postalcode,
            country: billingdata.country,
            street_address: billingdata.address,
            paid: false,
            tprice,
        });
        ////console.log('Order created:', orderinfo);

        // Create the Stripe checkout session
        ////console.log('Creating Stripe session...');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items.map(item => ({
                quantity: item.quantity,
                price_data: {
                    currency: item.price_data.currency,
                    product_data: { name: item.price_data.product_data.name },
                    unit_amount: item.price_data.unit_amount*100,
                }
            })),
            mode: 'payment',
            customer_email: billingdata.email,
            success_url: `${process.env.Public_url}/Msg?success=true`,
            cancel_url: `${process.env.Public_url}/Msg?canceled=true`,
            metadata: { orderId: orderinfo._id.toString(),text:"ok" }
        });
      //  //console.log('Stripe session created:', session);

        res.json({ status: true,sessionId: session.id  });

    } catch (error) {
        //console.error('Error creating Stripe session:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}
module.exports.getcarts=async(req,res,next)=>{
    try{
      const data =await Orders.find().sort({createdAt: -1 });
      res.json({status:true,data:data});
    }
    catch(e)
{

}}
