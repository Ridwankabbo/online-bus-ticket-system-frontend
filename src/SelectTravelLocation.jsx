import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import "./selectTravelLocation.css";

export default function SelectLocation() {
    const [busList, setBusList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 👈 Initialize the hook

    // State to hold the user's selections
    const [selectedFrom, setSelectedFrom] = useState('');
    const [selectedDest, setSelectedDest] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/bus_api/locations/");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json_data = await response.json();
                console.log(json_data);
                
                setBusList(json_data);
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- FORM SUBMISSION HANDLER ---
    const handleSearch = (e) => {
        e.preventDefault(); // 👈 Prevent default form submission

        if (!selectedFrom || !selectedDest) {
            alert('Please select both a departure and a destination.');
            return;
        }

        // 1. Filter the bus list based on the selected values
        const filteredBuses = busList.filter(bus => 
            bus.from_location === selectedFrom && bus.destination === selectedDest
        );

        // 2. Navigate to the results page and pass the filtered data
        navigate('/bus-results', { state: { results: filteredBuses, from: selectedFrom, dest: selectedDest } });
    };

    // --- Data Processing for Dropdowns ---
    const uniqueLocations = [...new Set(
        busList.flatMap(location => [location.name])
    )].filter(location => location); 

    // --- Render Logic ---
    if (loading) return <p className="text-center py-5">Loading available routes...</p>;
    if (error) return <p className="text-center py-5 text-red-600">Error fetching data: {error}</p>;

    return (
        <section className="my-5 text-center p-10 mx-20 rounded-md">
            <h2 className="text-[30px] py-15 font-semibold">Select your Journey From and Destination </h2>
            {/* 👈 Attach handleSearch to the form's onSubmit */}
            <form onSubmit={handleSearch}> 
                <div className="flex justify-around flex-wrap gap-10">
                    
                    {/* FROM Dropdown */}
                    <select 
                        name="from" 
                        className="px-20 py-3 bg-stone-200 rounded-md"
                        onChange={(e) => setSelectedFrom(e.target.value)} // 👈 Update state on change
                        value={selectedFrom}
                    >
                        <option value="">Select Departure Location</option>
                        {uniqueLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                    
                    {/* DESTINATION Dropdown */}
                    <select 
                        name="destination" 
                        className="px-20 py-3 bg-stone-200 rounded-md"
                        onChange={(e) => setSelectedDest(e.target.value)} // 👈 Update state on change
                        value={selectedDest}
                    >
                        <option value="">Select Destination</option>
                        {uniqueLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                    
                    <button className="bg-green-700 text-white px-5 py-3 rounded-sm" type="submit">find bus</button>
                </div>
            </form>
        </section>
    );
}