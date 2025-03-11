import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using Cash On Delivery
const placeOrderCod = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Implement order processing logic here using the provided user, items, amount, and address.
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment:  false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData:{} });
        res.status(200).json({ success: true, message: 'Order placed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
    
}

// placing orders using stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Implement order processing logic here using the provided user, items, amount, and address.
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'STRIPE',
            payment:  false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData:{} });
        res.status(200).json({ success: true, message: 'Order placed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
    
}

// placing orders using razorpay
const placeOrderRazorPay = async (req, res) => {
    
}

// fetch orders for the admin panel
const allOrders = async (req, res) => {
    
}

// fetch all user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const userOrders = await orderModel.find({ userId });
        res.status(200).json({ success: true, userOrders });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update order status from the admin panel
const updateOrderStatus = async (req, res) => {

}


export { placeOrderCod, placeOrderRazorPay, placeOrderStripe, allOrders, userOrders, updateOrderStatus };

