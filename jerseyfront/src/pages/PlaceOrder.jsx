import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {

  const {navigate, cartItems, backendUrl, token, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [method, setMethod] = useState("COD");

  const [ formData, setFormData ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    county: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value}))
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("form submited");

    try {
      let orderItems = [];

      for(const items in cartItems) {
        for(const item in cartItems[items]) { 
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      console.log("orderItems", orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        // paymentMethod: method,
        amount: getCartAmount() + delivery_fee,
        // status: "pending"
      }

      console.log("orderData", orderData);

      switch (method) {
      

        // API calls for payment methods
        case 'COD':
          // API call for COD payment
          // console.log("switch executed")
          { const response = await axios.post(backendUrl + '/api/order/cash', orderData, {headers: {token}})
          if(response.data.success) {
            navigate("/orders")
            setCartItems({})
            // toast.success(response.data.message);
            
          } else {
            // console.error("Failed to place order", error);
            toast.error(response.data.message);
          }
          break; }

        case 'STRIPE' : 
          // API call for Stripe payment
          { const response_stripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
          if(response_stripe.data.success) {
            const { session_url } = response_stripe.data;
            window.location.replace(session_url);
            console.log(response_stripe.data.message); 
          } else {
            console.error("Failed to place order", response_stripe.data.message);
            toast.error(response_stripe.data.message);
          }
           break; }
      
        default:
          break;
      }

    } catch (error) {
      console.error("Failed to place order", error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      
      {/* ---------Left side-------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFO" />
        </div>

        <div className="flex gap-3">
          <input required type="text" onChange={onChangeHandler} name="firstName" value={formData.firstName} placeholder='first name...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required type="text" onChange={onChangeHandler} name="lastName" value={formData.lastName} placeholder='last name...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input required type="email" onChange={onChangeHandler} name="email" value={formData.email} placeholder='email...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input required type="text" onChange={onChangeHandler} name="street" value={formData.street} placeholder='street...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        
        <div className="flex gap-3">
          <input required type="text" onChange={onChangeHandler} name="city" value={formData.city} placeholder='city/town...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required type="text" onChange={onChangeHandler} name="county" value={formData.county} placeholder='county...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <div className="flex gap-3">
          <input required type="number" onChange={onChangeHandler} name="zipCode" value={formData.zipCode} placeholder='zipcode...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required type="text" onChange={onChangeHandler} name="country" value={formData.country} placeholder='country...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input required type="number" onChange={onChangeHandler} name="phone" value={formData.phone} placeholder='phoneNumber...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* ---------Right side-------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

      {/* -----------Payment Mehod Selection----------- */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD"/>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('STRIPE')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'STRIPE' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className="mx-4 h-5" />
            </div>

            <div onClick={() => setMethod('RAZORPAY')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'RAZORPAY' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className="mx-4 h-5" />
            </div>

            <div onClick={() => setMethod('COD')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-500' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button 
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm active:bg-gray-700"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder