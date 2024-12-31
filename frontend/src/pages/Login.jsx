import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => { // <-- Rename this to 'Login'
  const [state, setState] = useState('Sign Up'); // Toggle between 'Sign Up' and 'Login'
  const [name, setName] = useState('');          // For the sign-up form name field
  const [email, setEmail] = useState('');        // Email for both login and sign-up
  const [password, setPassword] = useState('');  // Password for both login and sign-up

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext); // Extract token and setToken from context

  // Handle form submission (either sign-up or login)
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Check if the user is signing up
    if (state === 'Sign Up') {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`, // Registration endpoint
          { name, email, password }
        );

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token); // Store token and update context
          toast.success('Account created successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('An error occurred during registration');
      }
    } else {
      // Handle user login
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`, // Login endpoint
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token); // Store token and update context
          toast.success('Logged in successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('An error occurred during login');
      }
    }
  };

  // Redirect the user if they are already logged in
  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to home/dashboard if token exists
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to access your account
        </p>

        {/* Full Name input field only visible for Sign Up */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        {/* Email input field */}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        {/* Password input field */}
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle between Sign Up and Login forms */}
        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Dont have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary underline cursor-pointer">
            
              Create one
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login; // <-- Export 'Login' instead of 'login'
