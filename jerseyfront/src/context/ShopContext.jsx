import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Ksh.";
  const delivery_fee = 100;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("loginToken") || "" );
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    // Ensure cartData is always an object
    let cartData = structuredClone(cartItems || {});

    if (token) {
      // Ensure cartData[itemId] is an object before accessing it
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      // Update the quantity for the selected size
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }

      // Update the state with the new cart data
      setCartItems({ ...cartData });

      console.log("Sending to backend:", { itemId, size });

      try {
        await axios.post(
          `${backendUrl}/api/cart/add-to-cart`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please login to add items to cart");
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            count += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return count;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const updateQuantity = async (itemId, size, quantity) => {
    if (token) {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      try {
        await axios.post(
          backendUrl + "/api/cart/update-cart",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please login to add items to cart");
    }
  };

  const getUserCart = async (userToken) => {
    if (userToken) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/get-cart",
          {},
          { headers: { token: userToken } }
        );
        console.log(response.data);
        if (response.data.success) {
          // Make sure to access the correct property
          setCartItems(response.data.cartData || {});
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalAmount;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list-products"
      );
      console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Initialize with token from localStorage and fetch cart when token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  // Function to handle login - call this when user logs in
  const handleLogin = (userToken) => {
    localStorage.setItem("loginToken", userToken);
    setToken(userToken);
    // Cart will be fetched automatically through the useEffect that watches token
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    handleLogin,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

// Define prop types
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
