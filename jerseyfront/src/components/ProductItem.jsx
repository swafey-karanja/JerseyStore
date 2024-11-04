import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

const ProductItem = ({ id,name,image,price }) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className="overflow-hidden">
            <img src={image[0]} alt="" className="hover:scale-110 transition ease-in-out" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{currency} {price}</p>
    </Link>
  )
}

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired
}

export default ProductItem