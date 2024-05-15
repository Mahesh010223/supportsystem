import { useEffect, useState } from "react";
import Query from "./Query";
import axios from "axios";
import { useSelector } from "react-redux";

const QueryManager = () => {
    const [queries, setQueries] = useState([]);
    const [newQuery, setNewQuery] = useState('');
    const state = useSelector((state)=>state.user)

  
    useEffect(() => {
      const fetchQueries = async () => {
        const response = await axios.get('http://localhost:8000/queries');
        setQueries(response.data);
      };
  
      fetchQueries();
    }, []);
  
    const handleCreate = async () => {
      const newQueryObject = { query: newQuery, replies: [] ,user:state.username,support:false};
      await axios.post('http://localhost:8000/queries', newQueryObject);
      setNewQuery('');
      const response = await axios.get('http://localhost:8000/queries');
      setQueries(response.data);
    };
  
    const handleUpdate = async () => {
      const response = await axios.get('http://localhost:8000/queries');
      setQueries(response.data);
    };
  
    return (
      <div className="container mx-auto p-4 lg:w-1/2 bg-slate-300 h-screen">
        <h1 className="text-2xl font-bold mb-4">Query Manager</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            placeholder="Enter your query"
            className="w-1/2 px-2 py-1 border rounded mb-2 mr-6"
          />
          <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded">
            Raise Query
          </button>
        </div>
        <div>
          {queries.map((query) => (
            <Query key={query.id} query={query} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    );
  };
  
  export default QueryManager;