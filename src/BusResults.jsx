// BusResults.jsx
import React, { useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 👈 Import useLocation


const BUS_URL = '/bus-api/'
export default function BusResults() {
    const location = useLocation();
    const [busResults, setBusResult] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [bus_id, setBusId] = useState() ;

    // Extract the state (results, from, dest) passed during navigation
    const { from, dest } = location.state || {};

    console.log(from, dest);
    

    const searchData = new FormData()
    searchData.append('fromplace', from)
    searchData.append('destplace', dest)

    if (!busResults) {
        // Handle direct access or missing state
        return (
            <div className="p-10 text-center">
                <h2>No search results found.</h2>
                <p>Please go back and select a location.</p>
            </div>
        );
    }

    const handleSeatsSelection = (id) =>{
        // e.preventDefault();
        navigate('/bus-results/seats',{state:{id:id}})
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("this is form data:",searchData);
            
            try {
                const request = await fetch("http://localhost:8000/bus_api/bus/search/", {
                    method: 'POST',
                    body: searchData
            });

                if (request.ok) {
                    const result = await request.json()
                    setBusResult(result)
                    console.log(result);
                    
                    console.log(busResults);

                }
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="p-10 mx-20">
    <h2 className="text-[30px] font-bold mb-6">
        Available Buses from {from} to {dest}
    </h2>

    {busResults.length === 0 ? (
        <p className="text-xl text-red-500">
            Sorry, no buses found for this route.
        </p>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ✅ CORRECTED: Removed the extra curly braces */}
            {Array.isArray(busResults) && busResults.map(bus => (
                <div key={bus.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
                    <h3 className="text-2xl font-semibold mb-2">{bus.name}</h3>
                    {/* <p className="text-gray-600">Route: {bus.from_location} → {bus.destination}</p> */}
                    <p className="text-green-700 text-xl mt-3">
                        Price: {bus.price} BDT
                    </p>
                    <button onClick={()=>handleSeatsSelection(bus.id)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Book Seat Now
                    </button>
                </div>
            ))}
        </div>
    )}
</div>
    );
}