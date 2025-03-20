import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [ searchParams, setSearchParams ] = useSearchParams()

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if(!token) {
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/stripe-verification', {success, orderId}, {headers: {token}});
            if(response.data.success) {
                setCartItems({})
                navigate("/orders")
                console.log(response.data);
            } else {
                toast.error(response.data.message);
                navigate("/cart")
            }
        } catch (error) {
            console.error("Error verifying payment", error);
            toast.error("Failed to verify payment");
            // navigate("/")
            
        }
    }

    useEffect(() => {
        verifyPayment();
    },[token])

  return (
    <div>
      Verify
    </div>
  )
}

export default Verify
