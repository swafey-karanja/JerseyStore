import { assets } from "../assets/assets.js"


const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
        <img src={assets.logo} alt="" className="w-[max(18%,80px)] " />
        <button className="bg-gray-600 hover:bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
            Log Out
        </button>
    </div>
  )
}

export default Navbar