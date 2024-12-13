import { useState, useEffect } from "react"
import axios from "axios"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"


const List = ({ token }) => {

  const [list, setList] = useState([]);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list-products`);

      toast.success(response.data.message);
      if(response.data.success) {
        setList(response.data.products);
        // console.log(list);
      }
      else{
        console.log(response.data.message);
        toast.error("Something went wrong. Try again")
      }

    } catch(error) {
      console.log(error);
      toast.error("Something went wrong. Try again")
    }
  }

  const deleteProduct = async (id) => {
    try {

      const response = await axios.post(`${backendUrl}/api/product/remove-product`, {id}, { headers: { token } });

      if(response.data.success) {
        toast.success(response.data.message);
        await fetchProductsList();
      }
      else{
        toast.error(response.data.message);
      }


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again")
    }
  }

  useEffect(() => {
    fetchProductsList();
  },[])

  console.log(list);

  return (
    <>
      <p className="mb-2" >Listed Products</p>
      <div className="flex flex-col gap-2" >
        {/* Listed Products */}

        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price({currency})</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}

        {
          list.map((product, index) => (
            <div key={index} className="grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] grid-cols-[1fr_3fr_1fr] items-center gap-2 py-1 px-2 border bg-white text-sm">
              <img src={product.images && product.images[0] ? product.images[0] : 'fallback-image-url.jpg'} alt={product.name} className="w-16 sm:w-20" />
              <p>{product.name}</p>
              <p className="hidden md:flex">{product.category}</p>
              <p className="hidden md:flex">{product.subCategory}</p>
              <p>{product.price}</p>
              <div className="text-center">
                <button onClick={() => deleteProduct(product._id)} className="border px-4 py-2 ml-2 text-sm font-medium rounded-md">Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List