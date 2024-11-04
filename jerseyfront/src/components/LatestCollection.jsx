import { useContext, useState,useEffect } from "react"
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    }, [products])
    

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Discover the latest clothing collections at our e-commerce shop, featuring trendy styles for every occasion.
            </p>
        </div>

        {/* Rendering Products */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProducts.map((product, index) => (
                <ProductItem 
                    key={index}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                />
             ))
            }
        </div>
    </div>
  )
}

export default LatestCollection