import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [ token, setToken ] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      { token === '' 
        ? <Login setToken = { setToken } /> 
        : <>
            <Navbar />
            <hr />

            <div className="flex w-full">
              <Sidebar />

              <div className="mx-auto my-8 text-gray-600 text-base w-[70%] ml-[max(5vw,25px)]">
                  <Routes>
                    <Route path="/add" element={<Add />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/orders" element={<Orders />} />             
                  </Routes>
              </div>

            </div>
          </>
      
      }
        
    </div>
  )
}

export default App