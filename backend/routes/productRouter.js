import express from "express";
import { addProduct, listProducts, removeProduct, singleProductInfo } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
    '/add-product',
    adminAuth, 
    upload.fields([
        { name:'image1', maxCount:1 }, 
        { name:'image2', maxCount:1 }, 
        { name:'image3', maxCount:1 }, 
        { name:'image4', maxCount:1 }
    ]), 
    addProduct
);
productRouter.post('/remove-product', adminAuth, removeProduct);
productRouter.get('/single-product', singleProductInfo);
productRouter.get('/list-products', listProducts);

export default productRouter;