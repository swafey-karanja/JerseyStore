import express from "express";
import { addProduct, listProducts, removeProduct, singleProductInfo } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
    '/add-product', 
    upload.fields([
        { name:'image1', maxCount:1 }, 
        { name:'image2', maxCount:1 }, 
        { name:'image3', maxCount:1 }, 
        { name:'image4', maxCount:1 }
    ]), 
    addProduct
);
productRouter.post('/remove-product', removeProduct);
productRouter.post('/single-product', singleProductInfo);
productRouter.get('/list-products', listProducts);

export default productRouter;