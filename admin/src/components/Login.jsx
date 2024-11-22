import { useState } from "react";
import { backendUrl } from "../App.jsx";
import axios from 'axios'
import PropTypes from "prop-types"
import { toast } from "react-toastify";


const Login = ({ setToken }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const onSubmitHandler = async (e) => {

        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            console.log(response);

            if (response.data.success) {
                setToken(response.data.token);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <form onSubmit={onSubmitHandler} >
                <div className="mb-3 min-w-72">
                    <p className="text-sm font-medium text-gray-700 mb-2">Email Adress</p>
                    <input 
                        className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" 
                        type="email" name="email" 
                        placeholder="someone@someone.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3 min-w-72">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                    <input 
                        className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" 
                        type="password" 
                        name="password" 
                        required 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="mt-2 w-full py-2 rounded-md text-white bg-black active:bg-gray-700" type="submit" >Login</button>
            </form>
        </div>
    </div>
  )
}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}

export default Login