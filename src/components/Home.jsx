import React, { useEffect } from 'react'
import QueryManager from './QueryManager'
import SupportQuerymng from './SupportQuerymng'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const state = useSelector((state)=>state.user)
  const nevigate =useNavigate()
console.log(state.usertype)

const handleclick = ()=>{
  nevigate("/login")
}
  return (
    <div className="bg-slate-300 flex justify-center flex-col p-6 lg:pl-28 ">

      <div className='mt-8 flex justify-between'><h1 className="text-blue-950 text-xl font-bold self-start">{state.username}- {state.usertype}</h1> 
      <div><button className="bg-red-600 py-1 px-3 mr-5 rounded-lg" onClick={handleclick}>logout</button></div>
      </div>
      <div className='mt-10'>{state?.usertype == "enduser" ? <QueryManager/> :<SupportQuerymng/>}</div>

      
      
      
    </div>
  )
}

export default Home
