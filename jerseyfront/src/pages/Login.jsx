import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, backendUrl, navigate, handleLogin } = useContext(ShopContext);
  const [ name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize Google Auth
  // useEffect(() => {
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id: '738444482179-7m55cbc67rjf4j5q3uc7dcssdmlrdhva.apps.googleusercontent.com'
  //     }).then(() => {
  //       console.log('Google Auth initialized');
  //     }).catch(err => {
  //       console.error('Error initializing Google Auth', err);
  //     });
  //   });
  // }, []);

  // const handleGoogleLogin = async () => {
  //   try {
  //     const auth2 = window.gapi.auth2.getAuthInstance();
  //     const googleUser = await auth2.signIn();
  //     const idToken = googleUser.getAuthResponse().id_token;
      
  //     // Send token to your backend
  //     const response = await axios.post(backendUrl + '/api/user/google-login', { token: idToken });
      
  //     if(response.data.success) {
  //       handleLogin(response.data.token);
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     toast.error("Google Sign-In failed. Please try again.");
  //   }
  // };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send token to your backend
      const response = await axios.post(backendUrl + '/api/user/google-login', { 
        token: credentialResponse.credential 
      });
      
      if(response.data.success) {
        handleLogin(response.data.token);
        toast.success(response.data.message);
      } else {
        console.error('Google Sign-In Error:', response.data.message)
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Failed', error);
    toast.error("Google Sign-In failed. Please try again.");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      if (currentState === 'SignUp') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response);
        if (response.data.success) {
          // setToken(response.data.token);
          // localStorage.setItem("loginToken", response.data.token);
          handleLogin(response.data.token);
          toast.success(response.data.message);
        }
        else {
          toast.error(response.data.message);
        }
        
      } 
      else if(currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if(response.data.success) {
          // setToken(response.data.token);
          // localStorage.setItem("loginToken", response.data.token);
          handleLogin(response.data.token);
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

  useEffect(() => {
    if(token) {
      navigate('/');
    }
  }, [token]);
  

  return (
    <>
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
        <button className="w-4/5 bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700 rounded-md">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-2 mb-2 gap-4 text-gray-800">Or</p>
      <div className="flex justify-center items-center gap-2 mb-2 mt-2">
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          <p className="prata-regular text-md">
            Continue with
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        <div className="flex justify-center gap-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </div>
    </>
   
  )
}

export default Login