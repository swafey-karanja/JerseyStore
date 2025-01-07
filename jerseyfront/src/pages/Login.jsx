import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

  const [currentState, setCurrentState] = useState('SignUp');
  const {token, setToken, backendUrl, navigate} = useContext(ShopContext);
  const [ name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      if (currentState === 'SignUp') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("loginToken", response.data.token);
          toast.success(response.data.message);
          // navigate('/');
        }
        else {
          toast.error(response.data.message);
        }
        
      } 
      else if(currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("loginToken", response.data.token);
          toast.success(response.data.message);
         
        } else {
          toast.error(response.data.message);
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {
        currentState === 'Login' 
          ? '' 
          : <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." className="w-full px-3 py-2 border border-gray-800" required />
      }
      <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email..." className="w-full px-3 py-2 border border-gray-800" required />
      <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password..." className="w-full px-3 py-2 border border-gray-800" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {
          currentState === 'Login' 
          ? <p className="cursor-pointer text-md font-semibold text-blue-500">Forgot your Password?</p>
          : ''
        }

        {
          currentState === 'Login' 
          ? <p onClick={() => setCurrentState('SignUp')} className="cursor-pointer text-blue-500 text-md font-semibold">Create Account</p>
          : <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-500 text-md font-semibold">Log in</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login