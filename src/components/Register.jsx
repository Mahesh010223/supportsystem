import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passward:"",
        usertype: "enduser"
      })
   
      const nevigate=useNavigate()
      const [errors, setErrors] = useState({});
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.username) {
          newErrors.username = 'Name is required';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.passward) {
          newErrors.passward = 'passward is required';
        }
    
        setErrors(newErrors);
        console.log("formData",formData)
    
        // Submit the form if there are no errors
        if (Object.keys(newErrors).length === 0) {
          
            axios
            .post('http://localhost:8000/user', formData)
            .then((response) => {
              if (response) {
                console.log("response",response)
                toast.success("You have Successfully Registered") 
              } else {
                toast.error("data not found")
              };;
            })
            .catch((err) => {
              console.log(err)
            });  
          nevigate("/login")
        
        }
    console.log("errors",errors)
    
    
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    
      return (
        <div>
        <div className='bg-slate-300 w-screen flex flex-col justify-center items-center p-6 lg:p-1 h-screen'>
          
            <span className='my-8 text-2xl font-bold'>User Details</span>
          <form className="w-full max-w-lg border-b-2 bg-white p-8 rounded-lg"  >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            USERNAME
          </label>
          <input  value={formData.username}  name='username' onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
          <p className="text-red-500 text-xs italic">{errors.username}</p>
        </div>
        
        <div className="flex flex-wrap mx-3 my-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Email
          </label>
          
          <input value={formData.email} name='email' onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        </div>

        <div className="flex flex-wrap mx-3 my-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Password
          </label>
          
          <input value={formData.passward} name='passward' onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" />
          <p className="text-red-500 text-xs italic">{errors.passward}</p>
        </div>
        </div>
    
        
    </form>
    
    
    <div className='flex justify-end w-fit'>
        <button onClick={handleSubmit} className="bg-cyan-400 rounded-2xl text-white px-5 py-3 mt-6 ">Submit</button>
    </div>
        </div>
    
        </div>
      )
}

export default Register
