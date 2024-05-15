import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addUser } from './store/userslice';
import { useDispatch } from 'react-redux';


const Login = () => {

    const nevigate = useNavigate()
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const dispach = useDispatch()

    const handelLogin = async (e) => {
        e.preventDefault();
        try {
            // Get users from the server
            const response = await axios.get('http://localhost:8000/user');
            const users = response.data;
        console.log(users)
            // Find the user with matching username and password
            const user = users.find(user => user.username === username && user.passward == password);
        
            if (user) {
              toast.success('Login successful:', user);
              dispach(addUser(user))
              nevigate("/home")

             
            } else {
             
              nevigate("/login")
              toast.error('Login failed: Invalid username or password');
            }
          } catch (error) {
            console.error('Error logging in:', error);
           
          }
    }


    return (
        <div className="bg-slate-300 flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <form onSubmit={handelLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">USER NAME</label>
                        <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" typeof='submit' className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                        <button type="submit" onClick={()=>{nevigate("/register")}} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Sign up
                        </button>
                       
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
