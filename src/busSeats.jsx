import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const SEATS_URL = "http://localhost:8000/bus/bus-seats/";
const BusSeatView = ({ busId }) => {
    const location = useLocation();
    // console.log(location);

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { shidule_id, bus_id, bus_name, source, destination, price } = location.state || {};

    console.log("shidule",shidule_id, 'bus', bus_id, bus_name, source, destination);
    
    const searchData = {
        id: bus_id
    }
    const params = new URLSearchParams(searchData).toString();
    const WithParams = `${SEATS_URL}?${params}`
    console.log(WithParams);

    // --- FETCH DATA SIMULATION ---
    useEffect(() => {
        // Replace this with your actual API call (e.g., using fetch or axios)

        if (!bus_id) {
            console.log("Bus id is messing ");
            return;
        }

        // const bus_id = new FormData();
        // bus_id.append('bus_id', id);
        const fetchSeats = async () => {

            try {
                const request = await fetch(WithParams);

                if (request.ok) {
                    const data = await request.json();
                    console.log(data);

                    setSeats(data); // Use fetched data here
                    setLoading(false);
                    console.log(seats);

                }
            } catch (error) {
                console.log(error);

            }

            // Simulating a network delay
            // await new Promise(resolve => setTimeout(resolve, 500)); 
        };

        fetchSeats();
    }, [busId, WithParams]);

    // --- SEAT SELECTION LOGIC ---
    const handleSeatClick = (seat) => {
        if (seat.seat_status == true) return; // Cannot select booked seats

        const isSelected = selectedSeats.includes(seat.id);

        if (isSelected) {
            // Deselect seat
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        } else {
            // Select seat
            setSelectedSeats([...selectedSeats, seat.id]);
        }
    };

    const handleSeatSelection= (seat)=>{
        const seatsBookingData = {
            shidule:shidule_id,
            seat: selectedSeats
        }
    }


    // Inside BusSeatView component
    const getSeatClass = (seat) => {
        const isSelected = selectedSeats.includes(seat.id);

        if (seat.seat_status == true) {
            return 'bg-gray-400 cursor-not-allowed';
        } else if (isSelected) {
            return 'bg-blue-600 border-blue-800 hover:bg-blue-700';
        } else {
            // Available
            return 'bg-green-500 border-green-700 hover:bg-green-600 cursor-pointer';
        }
    };

    const procedeToPayment = ()=>{
        localStorage.setItem('selectedSeats', seats);
        navigate('/bus-results/seats/payment')
    }

    // --- RENDERING HELPERS ---


    if (loading) {
        return <div className="text-center p-8">Loading seat map...</div>;
    }
    // ----------------------------------------------------------------

    return (
        <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-xl">
            <pre className="text-3xl font-bold mb-6 text-center">
                Bus:{bus_name} <br/>
                Source:{source} to destination: {destination}</pre>
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-sm border-4 border-gray-600 rounded-lg p-6 bg-white shadow-inner">
                    <h2>{}</h2>
                    {/* Bus Driver Area */}
                    <div className="flex justify-end mb-8">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                            <span className="text-xs">Driver</span>
                        </div>
                    </div>

                    {/* Seats Layout (4 per row: 2-aisle-2) */}
                    <div className="grid grid-cols-5 gap-y-4 gap-x-2">

                        {seats.map((seat, index) => (
                            <div
                                key={seat.id}
                                onClick={() => handleSeatClick(seat)}
                                // Conditional Classes for Styling and Layout
                                className={`
                        w-12 h-12 rounded-lg transition-all duration-150 shadow-md border-b-4 
                        flex items-center justify-center font-semibold text-white text-sm
                        
                        ${getSeatClass(seat)} 
                        
                        ${index % 4 === 2 ? 'col-start-4' : ''} 
                    `}
                            >
                                {seat.seat_name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selection Summary */}
            <div className="mt-8 pt-4 border-t border-gray-300">
                <h3 className="text-xl font-semibold mb-3">Your Selection:</h3>
                <p className="text-lg">
                    Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </p>
                <p className="text-lg text-green-700 font-bold">
                    Total Price: {selectedSeats.length * price} BDT
                </p>
                <button
                    className={`mt-4 w-full py-3 rounded text-white font-bold transition-colors 
                        ${selectedSeats.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 cursor-not-allowed'}`
                    }
                    disabled={selectedSeats.length === 0}
                    onClick={procedeToPayment}
                >
                    Proceed to Bookng
                </button>
            </div>

            {/* Legend */}

            <div className="mt-6 flex justify-center space-x-4 text-sm">
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div> Available</span>
                
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div> Selected</span>
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div> Booked</span>
            </div>
        </div>
    );
};

export default BusSeatView;