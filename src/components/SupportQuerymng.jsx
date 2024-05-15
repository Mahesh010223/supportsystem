import React, { useEffect, useState } from 'react'
import Query from './Query'
import axios from 'axios';
import { useSelector } from 'react-redux';

const SupportQuerymng = () => {
    const [queries, setQueries] = useState([]);
    const [squeries, setSqueries] = useState([]);
    const state = useSelector((state)=>state.user)
    useEffect(() => {
        const fetchQueries = async () => {
          const response = await axios.get('http://localhost:8000/queries');
          const filterdarr= response.data.filter((query)=>query.support == true)
          setQueries(response.data);
          setSqueries(filterdarr)
          
        };
    
        fetchQueries();
      }, []);

    const handleUpdate = async () => {
        const response = await axios.get('http://localhost:8000/queries');
        setQueries(response.data);
        
      };

      if(queries.length == 0){
        return <div className=' bg-slate-300 h-screen '> <h1 className='text-2xl text-green-600 mt-20'>No queries Rised from end user</h1></div>
      }
    
  return (
    <div className=' bg-slate-300 h-screen '>
        
      <div className='lg:w-1/2'>
        <>{state.usertype =="suportuser"? 
        <>
        
        {squeries.map((query) => (
          <Query key={query.id} query={query} onUpdate={handleUpdate} />
        ))}
        </>
        :<>
        {queries.map((query) => (
            <Query key={query.id} query={query} onUpdate={handleUpdate} />
          ))}
        </>
        
        }</>
          
        </div>
    </div>
  )
}

export default SupportQuerymng
