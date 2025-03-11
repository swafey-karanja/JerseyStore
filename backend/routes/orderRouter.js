import express from "express";
import {
  placeOrderCod,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
} from "../controllers/ordersController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// payment method Actions
orderRouter.post("/cash", authUser, placeOrderCod);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// user actions
orderRouter.post("/user-orders", authUser, userOrders);

// admin actions
orderRouter.get("/orders", adminAuth, allOrders);
orderRouter.post("/update-status", adminAuth, updateOrderStatus);

export default orderRouter;
