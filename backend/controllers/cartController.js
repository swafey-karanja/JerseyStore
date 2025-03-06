import userModel from "../models/userModel.js";

// add products to user cart

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "added item to cart" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Could not add to cart" });
  }
};

// update products in user cart

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] = quantity;
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "updated item quantity in cart" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Could not update cart" });
  }
};

// fetch products from user cart

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    const cartData = await userData.cartData;

    res
      .status(200)
      .json({ success: true, cartData, message: "succesfully fetched cart" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Could not fetch user cart",
      });
  }
};

export { getUserCart, updateCart, addToCart };
