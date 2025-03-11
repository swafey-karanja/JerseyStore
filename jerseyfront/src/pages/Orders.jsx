import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { toast } from "react-toastify";

import axios from "axios";

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [ orderData, setOrderData ] = useState([]);

  const loadOrderData = async () => {
    try {
      if(!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/user-orders', {}, {headers: {token}})
      console.log(response.data);
      if(response.data.success) {
        let orderItems = [];
        response.data.userOrders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            orderItems.push(item);
          })
        })
        console.log(orderItems);
        setOrderData(orderItems.reverse());
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      toast.error("Error fetching order data", error);
      
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4" key={index}>
              <div className="flex items-start gap-6 text-sm">
                <img src={item.images[0]} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:
                    <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-2">
                    Payment: 
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <div className="text-sm md:text-base">{item.status}</div>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders