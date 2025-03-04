import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart); 
cartRouter.post("update-cart", updateCart);
cartRouter.post("get-cart", getUserCart);

export default cartRouter;