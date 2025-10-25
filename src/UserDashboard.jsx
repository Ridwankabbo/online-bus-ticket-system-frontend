import React from "react";


export default function UserDashboard() {

    function SidPanel() {
        return (
            <section className="flex text-white">
                <div className="flex flex-col gap-10 item-center min-h-screen bg-green-800 px-5 py-3" id="logo">

                    <h2 className="text-[20px] md:text-[40px] font-bold">EasyTravel</h2>
                    <ul className="text-center">
                        <li className="p-3">AM</li>
                        <li className="p-3">PM</li>
                        <li className="p-3 bg-red-700 rounded-sm">Logout</li>
                    </ul>

                </div>

                <div>

                </div>
            </section>
        )
    }

    return (
        <>
            <SidPanel />
        </>
    )
}
