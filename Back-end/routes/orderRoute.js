import express from "express";
import {
  PlaceOrder,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  allOrders,
  userOrders,
  updateOrder,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "./../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();
// admin routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrder);

// payment
orderRouter.post("/place", authUser, PlaceOrder);
orderRouter.post("/stripe", authUser, PlaceOrderStripe);
orderRouter.post("/razorpay", authUser, PlaceOrderRazorpay);

//user routes
orderRouter.post("/userorders", authUser, userOrders);
//verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
export default orderRouter;
