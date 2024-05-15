import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Query = ({ query, onUpdate }) => {
    const [newReply, setNewReply] = useState('');
    // const[replyshow,setReplyshow] = useState(false);
    const state = useSelector((state)=>state.user)

    const handleAddReply = async () => {
      const updatedQuery = { ...query, replies: [...query.replies, newReply] };
      await axios.put(`http://localhost:8000/queries/${query.id}`, updatedQuery);
      setNewReply('');
      onUpdate();
  
    };
  
    const handleDelete = async () => {
      await axios.delete(`http://localhost:8000/queries/${query.id}`);
      onUpdate();
    };

    const handleassign = async () => {
      const updatedQuery = { ...query, support:true };
      await axios.put(`http://localhost:8000/queries/${query.id}`, updatedQuery);
      onUpdate();
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4 ">
        <div className={`flex justify-between ${query.support ? "bg-lime-400":null} p-3 rounded-lg`}><h3 className="text-xl font-bold">{query.query}</h3> <h2 className="text-lg font-bold text-purple-700">{query.user}</h2></div>

        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2 text-blue-950" >Replies</h4>
          {query.replies.map((reply, index) => (
            <div key={index} className="border-t border-gray-200 pt-2 mt-2"> 
              <p>{reply}</p>
            </div>
          ))}

          
          
          <div className="mt-4">
            {state.usertype !== "adminuser" && 
            <>
            <div>
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Add a reply"
              className=" px-2 py-1 border rounded mb-2"
            />
            </div>

            
            <button onClick={handleAddReply} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
              Add Reply
            </button></>}
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
             Close ticket
            </button>

            {state.usertype == "adminuser" && <button onClick={handleassign} className="bg-red-500 m-5 text-white px-3 py-1 rounded">
             assign ticket 
            </button>}
          </div>
          
        
          
        </div>
      </div>
    );
}

export default Query
