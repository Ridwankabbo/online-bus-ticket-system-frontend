// BusResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // 👈 Import useLocation

export default function BusResults() {
    const location = useLocation();
    
    // Extract the state (results, from, dest) passed during navigation
    const { results, from, dest } = location.state || {}; 

    if (!results) {
        // Handle direct access or missing state
        return (
            <div className="p-10 text-center">
                <h2>No search results found.</h2>
                <p>Please go back and select a location.</p>
            </div>
        );
    }

    return (
        <div className="p-10 mx-20">
            <h2 className="text-[30px] font-bold mb-6">
                Available Buses from **{from}** to **{dest}**
            </h2>
            
            {results.length === 0 ? (
                <p className="text-xl text-red-500">
                    Sorry, no buses found for this route.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {results.map(bus => (
                        <div key={bus.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
                            <h3 className="text-2xl font-semibold mb-2">{bus.name}</h3>
                            <p className="text-gray-600">**Route:** {bus.from_location} → {bus.destination}</p>
                            <p className="text-green-700 text-xl mt-3">
                                **Price:** {bus.price} BDT
                            </p>
                            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}