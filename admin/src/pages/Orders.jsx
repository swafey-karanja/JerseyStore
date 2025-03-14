import { useEffect, useState,  } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    if(!token) {
      return;
    }

    try {

      const response = await axios.post(backendUrl + "/api/order/all-orders", {}, {headers:{token}});
      console.log(response.data);
      if(response.data.success) {
        setOrders(response.data.orders);
        console.log("Orders fetched successfully", orders);
        toast.success("Orders fetched successfully");
      } else {
        console.error("Failed to fetch orders", response.data.message);
        toast.error("Failed to fetch orders");
      }

    } catch (error) {
      console.error("Error fetching orders", error);
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Orders page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
              <div>
                {
                  order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className="py-0.5" key={index} > {item.name} x {item.quantity} <span> {item.size} </span> </p>
                    } else {
                      return <p className="py-0.5" key={index} > {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                    }
                  })
                }
              </div>
              <p className="mt-3 mb-2 font-medium" >{order.address.firstName + " " + order.address.lastName} </p>
              <div> 
                <p>{ order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.county + "," + order.address.country }</p> 
              </div>
              <p> {order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]" >Items: {order.items.length}</p>
                <p className="mt-3" >Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "PAID" : "PENDING" }</p>
              </div>
              <p className="text-sm sm:text-[15px]" >{currency}: {order.amount}</p>
              <select value={order.status} className="p-2 font-semibold cursor-pointer">
                <option value="order-placed">Order Placed</option>
                <option value="dispatched">Dispatched</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders