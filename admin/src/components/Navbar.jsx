import { assets } from "../assets/assets.js"
import PropTypes from "prop-types"
import { toast } from "react-toastify";


const Navbar = ({ setToken }) => {

  // const logOut = () => {
  //   setToken('');
  //   toast.success("Logged out successfully!");
  //   localStorage.removeItem("token");
  //   window.location.reload();
  // }

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
        <img src={assets.logo} alt="" className="w-[max(18%,80px)] " />
        <button onClick={() => {setToken(''), toast.success("Logged out successfully!")}} className="bg-gray-600 hover:bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
            Log Out
        </button>
    </div>
  )
}

Navbar.propTypes = {
  setToken : PropTypes.func.isRequired
}

export default Navbar