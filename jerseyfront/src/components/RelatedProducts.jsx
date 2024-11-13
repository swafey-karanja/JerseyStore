import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import PropTypes from "prop-types";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({category, subCategory}) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
      if (products.length > 0) {
        let productsCopy = products.slice();

        productsCopy = productsCopy.filter((item) => category === item.category);
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

        setRelated(productsCopy.slice(0,5));
      }
    }, [category, products, subCategory])
    

  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      // window.location.assign(`/product/${item._id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} />
                  </div>                
                ))
            }
        </div>
    </div>
  )
}

RelatedProducts.propTypes = {
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
}

export default RelatedProducts