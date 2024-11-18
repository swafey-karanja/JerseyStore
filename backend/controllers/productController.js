import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// Function to add a product

const addProduct = async (req, res) => {
    
    try {
        
        // extract the fields from the form body

        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        // extract the images from the request files.

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // check whether all fields are entered

        if ( !name || !description || !price || !category || !subCategory || !sizes || !bestSeller ) {
            return res.json({ success: false, message: "Provide all the required fields" });
        }

        // console.log( name, description, price, category, subCategory, sizes, bestSeller );
        

        // Storing the images in the DB

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);


        // uploading the images to cloudinary

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );

        console.log('images Url', imagesUrl);

        // adding the product data to mongoDB

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? true : false,
            images: imagesUrl,
            date: Date.now()
        };

        console.log(productData);

        const newProduct = new productModel(productData);

        await newProduct.save();

        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// Function to list products

const listProducts = async (req, res) => {
    
}

// Function to remove a product

const removeProduct = async (req, res) => {
    
}

// Function to get a single product info

const singleProductInfo = async (req, res) => {
    
}

export { addProduct, listProducts, removeProduct, singleProductInfo };