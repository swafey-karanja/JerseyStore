import express from "express";
import {
  placeOrderCod,
  placeOrderMpesa,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateOrderStatus,
  stripeVerification,
  verifyRazorPay,
} from "../controllers/ordersController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// payment method Actions
orderRouter.post("/cash", authUser, placeOrderCod);
orderRouter.post("/mpesa", authUser, placeOrderMpesa);
orderRouter.post("/razorPay", authUser, placeOrderRazorPay);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// user actions
orderRouter.post("/user-orders", authUser, userOrders);

// admin actions
orderRouter.post("/all-orders", adminAuth, allOrders);
orderRouter.post("/update-status", adminAuth, updateOrderStatus);

// payment verification
orderRouter.post("/stripe-verification", authUser, stripeVerification);
orderRouter.post("/razorPay-verification", authUser, verifyRazorPay);

export default orderRouter;
