import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets'
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const [searchIcon, setSearchIcon] = useState(false);
    const {showSearch, setShowSearch, getCartCount} = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setSearchIcon(true);
        } else {
            setSearchIcon(false);
        }
    }, [location])


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        
        <Link to='/'>
            <img src={assets.logo} className='w-36' alt="" />
        </Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to='/collections' className='flex flex-col items-center gap-1'>
                <p>COLLECTIONS</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
        </ul>

        <div className="flex items-center gap-6">
            <img
             src={assets.search_icon} 
             alt="" 
             className={`w-5 cursor-pointer ${
                searchIcon ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
             onClick={() => setShowSearch(!showSearch)}
             
            />

            <div className="group relative">
                <Link to={'/login'}>
                    <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />
                </Link>

                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className="cursor-pointer hover:text-black">My Profile</p>
                        <p className="cursor-pointer hover:text-black">Orders</p>
                        <p className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                </div>
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
                <p className="absolute right-[-7px] bottom-[-7px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px]">{getCartCount()}</p>
            </Link>

            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer sm:hidden" />
        </div>

        {/* Sidebar menu for small screens */}

        <div className={`z-50 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-[width] duration-500 ease-in-out ${visible ? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div className="flex items-center gap-4 p-3 cursor-pointer" onClick={() => setVisible(false)}>
                    <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180 " />
                </div>

                <NavLink className="py-2 pl-6 border" to='/' onClick={() => setVisible(false)}>HOME</NavLink>
                <NavLink className="py-2 pl-6 border" to='/collections' onClick={() => setVisible(false)}>COLLECTION</NavLink>
                <NavLink className="py-2 pl-6 border" to='/about' onClick={() => setVisible(false)}>ABOUT</NavLink>
                <NavLink className="py-2 pl-6 border" to='/contact' onClick={() => setVisible(false)}>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar