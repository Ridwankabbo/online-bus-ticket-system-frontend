import React, { useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

const TripCard = (({trip, handleBusSelection}) => {
    const tripId = trip.id;
    const bus_name = trip.bus?.name || "None";
    const bus_type = trip.bus?.type;
    const source = trip.route?.source?.name;
    const destination = trip.route?.destination?.name;
    const distance = trip.destance;
    const price = parseFloat(trip.price).toFixed(2);
    const time = trip.bus_date_time;

    console.log(bus_name, bus_type, source, destination, price, time);

    return (
        <div onClick={()=>{handleBusSelection(trip)}} className="bg-white p-6 shadow-xl rounded-2xl border border-gray-100 transition duration-300 hover:shadow-2xl hover:scale-[1.01]">

            {/* 1. HEADER: Bus Information */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center space-x-3">
                    {/* <BusFront className="w-8 h-8 text-indigo-600" /> */}
                    <h2 className="text-2xl font-bold text-gray-800">{bus_name}</h2>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bus_type === 'AC' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {bus_type}
                </span>
            </div>

            {/* 2. ROUTE DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Source */}
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                    {/* <MapPin className="w-5 h-5 text-indigo-500" /> */}
                    <div>
                        <p className="text-sm text-gray-500">Source</p>
                        <p className="font-semibold text-gray-900">{source}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                    {/* <MapPin className="w-5 h-5 text-indigo-500" /> */}
                    <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-semibold text-gray-900">{destination}</p>
                    </div>
                </div>
            </div>

            {/* 3. TRIP METRICS */}
            <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                <div>
                    <p className="text-sm text-gray-500">Arrival Date and Time</p>
                    <p className="text-xl font-bold text-indigo-600">{time}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Distance (km)</p>
                    <p className="text-xl font-bold text-gray-700">{distance}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 flex items-center justify-center">
                        Price
                    </p>
                    <p className="text-2xl font-extrabold text-red-600">BDT {price}</p>
                </div>
            </div>
        </div>
    );
})

export default TripCard;