import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import "./selectTravelLocation.css";
import TripCard from "./TripCard";


const LOCATIONS_URL = "http://localhost:8000/bus/locations/";
// const BUS_LIST_URL = 'http://localhost:8000/bus/shidule-list/';
export default function SelectLocation({ navigaet_url }) {
    const [locationList, setLocationList] = useState([]);
    const [tripShidulesList, setTripShidulesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 👈 Initialize the hook

    // State to hold the user's selections
    const [selectedFrom, setSelectedFrom] = useState('');
    const [selectedDest, setSelectedDest] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchLocatinsData = async () => {
        try {
            const response = await fetch(LOCATIONS_URL, {
                method: "GET",
                headers: {

                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json_data = await response.json();
            console.log(json_data);

            setLocationList(json_data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // const fetchBusList = async () => {
    //     try {
    //         const request = await fetch(BUS_LIST_URL, {
    //             method: "GET",
    //             headers: {
    //                 // 'Authorization': `Bearer ${user_auth_token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //         });

    //         if (request.ok) {
    //             const result = await request.json();
    //             console.log(result);

    //             setTripShidulesList(result)

    //         }
    //     } catch (error) {

    //     }
    // };

    useEffect(() => {
        fetchLocatinsData();
        // fetchBusList();
    }, []);

    // --- FORM SUBMISSION HANDLER ---
    const handleSearch = (e) => {
        e.preventDefault(); // 👈 Prevent default form submission

        if (!selectedFrom || !selectedDest) {
            alert('Please select both a departure and a destination.');
            return;
        }

        tripShidulesList.map(trip => {
            if (trip.route?.source?.name == selectedFrom && trip.route?.destination?.name == selectedDest) {

            }
        });

        // console.log("from travel locations:",selectedFrom, selectedDest, selectedDate);
        

        navigate('/bus-results', { state: { from: selectedFrom, dest: selectedDest, date:selectedDate } });
    };

    // --- Data Processing for Dropdowns ---
    const uniqueLocations = [...new Set(
        locationList.flatMap(location => [location.name])
    )].filter(location => location);

    // --- Render Logic ---
    if (loading) return <p className="text-center py-5">Loading available routes...</p>;
    if (error) return <p className="text-center py-5 text-red-600">Error fetching data: {error}</p>;

    return (
        <section className="my-4 text-center  mx-20 rounded-md">
            <h2 className="text-[30px] py-15 font-semibold">filter bus shidules for your Journey From and Destination </h2>
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

                    <div class="relative">
                        <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                        <i class="fas fa-calendar-alt absolute left-3 top-9 text-gray-400"></i>
                        <input type="date" id="date" onChange={(e)=>setSelectedDate(e.target.value)} value={selectedDate} class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"/>
                    </div>

                    <button className="bg-green-700 text-white px-5 py-3 rounded-sm" type="submit">find bus</button>
                </div>
            </form>

            {/* <div>
                <h2 className="text-3xl font-semibold py-5 ">Bus shidule list</h2>
                <div>
                    {Array(tripShidulesList) && tripShidulesList.map(trip => {
                        return (
                            <TripCard key={trip.id} trip={trip} handleBusSelection={handleBusSelection} />
                        )
                    })}
                </div>
            </div> */}
        </section>
    );
}