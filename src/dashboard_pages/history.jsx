import React from "react";
import { useState, useEffect } from "react";
function TicketsHistory() {

    const FIND_TicketHistory_URL = "http://localhost:8000/user/user-profile/";

    const [TicketHistory, setTicketHistory] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(FIND_TicketHistory_URL, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (request.ok) {
                    const result = await request.json();
                    console.log(result);
                    
                    setTicketHistory(result);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">Ticket History</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-r">ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-r">Schedule</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-r">Seats</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">User</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-r">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!TicketHistory ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    Loading ticket history...
                                </td>
                            </tr>
                        ) : (
                            <tr className="border-b hover:bg-gray-50">
                                {/* Parent object */}
                                <td className="px-4 py-2 border-r">
                                    {TicketHistory.id}
                                </td>

                                {/* Shidule */}
                                <td className="px-4 py-2 border-r">
                                    {TicketHistory.shidule?.route?.source?.name}-{TicketHistory.shidule?.route?.destination?.name}
                                </td>


                                {/* Seats */}
                                <td className="px-4 py-2 border-r">
                                    {TicketHistory.seats?.seat_name}
                                </td>

                                {/* Nested: user object */}
                                <td className="px-4 py-2 border-r">
                                    {TicketHistory.user?.username}
                                    <div className="text-gray-500 text-sm">
                                        {TicketHistory.user?.email}
                                    </div>
                                </td>
                                
                                {/* Price */}
                                <td className="px-4 py-2">
                                    ${TicketHistory.shidule?.price}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default TicketsHistory;