import { useState } from "react"

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
          : <input type="text" placeholder="Name..." className="w-full px-3 py-2 border border-gray-800" required />
      }
      <input type="email" placeholder="Email..." className="w-full px-3 py-2 border border-gray-800" required />
      <input type="password" placeholder="Password..." className="w-full px-3 py-2 border border-gray-800" required />
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