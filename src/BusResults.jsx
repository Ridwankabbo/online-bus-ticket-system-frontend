// BusResults.jsx
import React, { useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 👈 Import useLocation
import TripCard from './components/TripCard';


const BUS_URL = 'http://localhost:8000/bus/shidules/';
export default function BusResults() {
    const location = useLocation();
    const [tripShidules, setTripShidules] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [bus_id, setBusId] = useState();

    // Extract the state (results, from, dest) passed during navigation
    const { from, dest } = location.state || {};

    // console.log(from, dest);


    const searchData = {
        source: from,
        destination: dest
    }
    const params = new URLSearchParams(searchData).toString();
    const WithParams = `${BUS_URL}?${params}`
    console.log(WithParams);


    if (!tripShidules) {
        // Handle direct access or missing state
        return (
            <div className="p-10 text-center">
                <h2>No search results found.</h2>
                <p>Please go back and select a location.</p>
            </div>
        );
    }

    const handleBusSelection = (trip) => {
        // e.preventDefault();
        console.log(trip.id, trip.bus?.id);
        const bus_details = {
            shidule_id: trip.id,
            bus_id : trip.bus?.id,
            bus_name :trip.bus?.name,
            source :trip.route?.source?.name,
            destination : trip.route?.destination?.name,
            price: trip.bus?.price
        }
        
        navigate('/bus-results/seats', { state: bus_details })
    }

    useEffect(() => {
        const fetchData = async () => {
            // console.log("this is form data:",searchData);

            try {
                const request = await fetch(WithParams);

                if (request.ok) {
                    const result = await request.json()
                    console.log("API results ",result);
                    setTripShidules(result)


                }
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            {Array(tripShidules) && tripShidules.map(trip => {
                return(
                    <TripCard key={trip.id} trip={trip} handleBusSelection={handleBusSelection} />
                )
            })}
        </div>
    )
}

