import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const BusSeatView = ({ busId }) => {
    const location = useLocation()
    // console.log(location);

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = location.state || {};

    // --- FETCH DATA SIMULATION ---
    useEffect(() => {
        // Replace this with your actual API call (e.g., using fetch or axios)

        if (!id) {
            console.log("Bus id is messing ");
            return;
        }

        const bus_id = new FormData();
        bus_id.append('bus_id', id);
        const fetchSeats = async (formData) => {

            try {
                const request = await fetch("http://localhost:8000/bus_api/bus/search/seats/", {
                    method: 'POST',
                    // headers:{
                    //     "Content-Type":"application/json"
                    // },
                    body: formData
                });

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

        fetchSeats(bus_id);
    }, [busId]);

    // --- SEAT SELECTION LOGIC ---
    const handleSeatClick = (seat) => {
        if (seat.status === 'booked') return; // Cannot select booked seats

        const isSelected = selectedSeats.includes(seat.id);

        if (isSelected) {
            // Deselect seat
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        } else {
            // Select seat
            setSelectedSeats([...selectedSeats, seat.id]);
        }
    };

    // --- RENDERING HELPERS ---

    // Function to determine the seat's Tailwind class based on its status
    const getSeatClass = (seat) => {
        const isSelected = selectedSeats.includes(seat.id);

        if (seat.status === 'booked') {
            return 'bg-gray-400 cursor-not-allowed'; // Booked seat style
        } else if (isSelected) {
            return 'bg-blue-500 hover:bg-blue-600 border-blue-700'; // Selected seat style
        } else {
            return 'bg-green-500 hover:bg-green-600 border-green-700 cursor-pointer'; // Available seat style
        }
    };

    if (loading) {
        return <div className="text-center p-8">Loading seat map...</div>;
    }
    // ----------------------------------------------------------------

    return (
        <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Seat Selection ({busId})</h2>

            <div className="flex justify-center mb-6">
                <div className="w-full max-w-sm border-4 border-gray-600 rounded-lg p-6 bg-white shadow-inner">

                    {/* Bus Driver Area */}
                    <div className="flex justify-end mb-8">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                            <span className="text-xs">Driver</span>
                        </div>
                    </div>

                    {/* Seats Layout (4 per row: 2-aisle-2) */}
                    <div className="grid grid-cols-5 gap-y-4 gap-x-2">
                        {/* {Array.isArray(seats) && seats.map(seat => ( */}
                            {/* <div
                                key={seat.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-white text-sm
                                    shadow-md border-b-4 
                                    ${getSeatClass(seat)}
                                    ${(seat.number - 1) % 4 === 2 ? 'col-start-4' : ''} 
                                    ${seat.number % 2 !== 0 ? 'justify-self-start' : 'justify-self-end'}
                                `}
                                onClick={() => handleSeatClick(seat)}
                            >
                                {seat.id}
                            </div> */}
                        {/* ))} */}

                        {seats.A1 ? (
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-white text-sm
                                    shadow-md border-b-4 bg-red-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.A1} */}
                                A1
                            </div>
                        ):(
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-black text-sm
                                    shadow-md border-b-4 bg-green-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                A1
                            </div>
                        )}
                        {seats.A2 ? (
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-white text-sm
                                    shadow-md border-b-4 bg-red-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                A2
                            </div>
                        ):(
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-black text-sm
                                    shadow-md border-b-4 bg-green-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                A2
                            </div>
                        )}
                        {seats.B1 ? (
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-white text-sm
                                    shadow-md border-b-4 bg-green-500
                                `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                B1
                            </div>
                        ):(
                            <div
                                // key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-black text-sm
                                    shadow-md border-b-4 bg-green-500`}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                B1
                            </div>
                        )}
                        {seats.B2 ? (
                            <div
                                key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-white text-sm
                                    shadow-md border-b-4 bg-green-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                B2
                            </div>
                        ):(
                            <div
                                key={seats.id}
                                className={`
                                    w-12 h-12 rounded-lg transition-all duration-150 ease-in-out
                                    flex items-center justify-center font-semibold text-black text-sm
                                    shadow-md border-b-4 bg-green-500
                                    `}
                                onClick={() => handleSeatClick(seats)}
                            >
                                {/* {seats.id} */}
                                B2
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Selection Summary */}
            <div className="mt-8 pt-4 border-t border-gray-300">
                <h3 className="text-xl font-semibold mb-3">Your Selection:</h3>
                <p className="text-lg">
                    **Seats:** {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </p>
                <p className="text-lg text-green-700 font-bold">
                    {/* **Total Price:** {selectedSeats.length * initialSeats[0].price} BDT */}
                </p>
                <button
                    className={`mt-4 w-full py-3 rounded text-white font-bold transition-colors 
                        ${selectedSeats.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 cursor-not-allowed'}`
                    }
                    disabled={selectedSeats.length === 0}
                >
                    Proceed to Payment
                </button>
            </div>

            {/* Legend */}
            <div className="mt-6 flex justify-center space-x-4 text-sm">
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div> Available</span>
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div> Selected</span>
                <span className="flex items-center"><div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div> Booked</span>
            </div>
        </div>
    );
};

export default BusSeatView;