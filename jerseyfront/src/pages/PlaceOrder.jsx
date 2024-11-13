import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"

const PlaceOrder = () => {

  const {navigate} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      
      {/* ---------Left side-------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFO" />
        </div>

        <div className="flex gap-3">
          <input type="text" placeholder='first name...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder='surname name...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input type="email" placeholder='email...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder='street...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        
        <div className="flex gap-3">
          <input type="text" placeholder='city/town...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder='county...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <div className="flex gap-3">
          <input type="number" placeholder='zipcode...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder='county...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input type="number" placeholder='phoneNumber...' className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
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
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className="mx-4 h-5" />
            </div>

            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className="mx-4 h-5" />
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button 
              onClick={() => navigate('/orders')}
              className="bg-black text-white px-16 py-3 text-sm active:bg-gray-700"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder