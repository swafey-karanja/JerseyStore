import { useState } from "react"
import { assets } from "../assets/assets"
import axios from 'axios'
import { backendUrl } from "../App";
import PropTypes from "prop-types"
import { toast } from "react-toastify";

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);


  const [description, setDescription] = useState('');
  const [name, setname] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validation: Check if price is greater than 0
    if (parseFloat(price) <= 0) {
      toast.error("Price must be greater than 0")
      return;
    }
  
    // Validation: Check if image1 is provided
    if (image1 === false) {
      toast.error("Image 1 is required.");
      return;
    }

    if(sizes.length === 0) {
      toast.error("Select a product size.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", parseFloat(price.replace(/,/g, ''))); // Remove commas and convert to number
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);
  
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
  
      console.log(formData);
  
      const response = await axios.post(`${backendUrl}/api/product/add-product`, formData, {
        headers: { token },
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        
        // reset the form
        setDescription('');
        setname('');
        setPrice(0);
        setCategory('Men');
        setSubCategory('Topwear');
        setSizes([]);
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handlePriceChange = (value) => {
    // Remove any non-numeric characters except for periods
    const numericValue = value.replace(/[^0-9]/g, '');
  
    // Format the number with commas
    const formattedValue = new Intl.NumberFormat('en-KE').format(numericValue);
  
    // Update the state
    setPrice(formattedValue);
  };
  


  return (
    <form onSubmit={onFormSubmit} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2 text-xl font-bold">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="Image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className="cursor-pointer w-20" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="Image1" name="Image1" hidden />
          </label>

          <label htmlFor="Image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className="cursor-pointer w-20" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="Image2" name="Image2" hidden />
          </label>

          <label htmlFor="Image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className="cursor-pointer w-20" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="Image3" name="Image3" hidden />
          </label>

          <label htmlFor="Image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className="cursor-pointer w-20" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="Image4" name="Image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-xl font-bold">Product Name</p>
        <input 
          value={name} 
          onChange={(e) => setname(e.target.value)}
          type="text" 
          placeholder="Product Name" 
          className="py-1.5 px-3.5 w-full max-w-[500px]" 
          required 
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-xl font-bold">Product Description</p>
        <textarea 
          type="text" 
          placeholder="Product Description" 
          className="py-1.5 px-3.5 w-full max-w-[500px]"
          required 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-xl font-bold">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="py-1.5 px-3.5 w-full max-w-[500px] cursor-pointer" required>
            <option value="Men">Men </option>
            <option value="Women">Women </option>
            <option value="Children">Children </option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-xl font-bold">Product Subcategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="py-1.5 px-3.5 w-full max-w-[500px] cursor-pointer" required>
            <option value="Topwear">Topwear </option>
            <option value="Bottomwear">Bottomwear </option>
            <option value="Winterwear">Winterwear </option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xl font-bold">Product Price</p>
        <input 
          type="text" 
          placeholder="2,500" 
          className="py-1.5 px-3.5 w-full max-w-[500px]" 
          required
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
      </div>


      <div>
        <p className="mb-2 text-xl font-bold">Product Size</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} >
            <p className={`${sizes.includes("S") ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-green-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" name="bestSeller" id="bestSeller" className="cursor-pointer w-5 h-5"/>
        <label htmlFor="bestSeller" className="cursor-pointer text-md">Best Seller</label>
      </div>

      <button className="mt-2 sm:w-1/3 w-full py-2 rounded-md text-white bg-black active:bg-gray-700" type="submit" >Add Product</button>
    </form>
  )
}


Add.propTypes = {
  token : PropTypes.string.isRequired
}


export default Add