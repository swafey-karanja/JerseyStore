import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = 'usd';
const deliveryFee = 10;

// gateway initializations
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    console.log(req.headers)
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        console.log("Received Origin URL:", origin);
        
        if (!origin) {
            return res.status(400).json({ success: false, message: "Missing origin URL in request headers." });
        }

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

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee'
                },
                unit_amount: deliveryFee * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'   
        });

        res.json({success: true, session_url: session.url});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
    
}

//verifying stripe payemnt
const stripeVerification = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if(success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, { cartData:{} });
            res.status(200).json({ success: true, message: 'Payment made successfully' });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(500).json({ success: false, message: 'Payment failed' });
        }
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
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, orders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
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
    try {
        
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});

        res.status(200).json({ success: true, message: 'Order status updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}


export { placeOrderCod, placeOrderRazorPay, placeOrderStripe, stripeVerification, allOrders, userOrders, updateOrderStatus };

