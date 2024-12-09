import { useState, useEffect } from "react"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"


const List = () => {

  const [list, setList] = useState([]);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list-products`);

      toast.success(response.data.message);
      if(response.data.success) {
        setList(response.data.products);
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

  useEffect(() => {
    fetchProductsList();
  },[])

  return (
    <>
      <p className="mb-2" >Listed Products</p>
      <div className="flex flex-col gap-2" >
        {/* Listed Products */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
      </div>
    </>
  )
}

export default List