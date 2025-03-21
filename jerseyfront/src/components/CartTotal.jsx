import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);


  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title text1="CHECKOUT" text2="" />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between items-center">
                <p>Subtotal:</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />

            <div className="flex justify-between">
                <p>Delivery fee:</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>

            <div className="flex justify-between">
                <p className="font-semibold text-xl">Total:</p>
                <p className="font-semibold text-xl">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal