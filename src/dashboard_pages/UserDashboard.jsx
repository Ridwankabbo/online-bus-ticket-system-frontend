import React, { useEffect, useState } from "react";
import TicketsHistory from "./history";
import { Link, Outlet } from "react-router-dom";

export default function UserDashboard() {

    function Heading() {
        return (
            <section className="flex justify-center py-4 bg-green-600 text-white text-5xl font-bold">
                <div>EasyTravel</div>
            </section>
        )
    }

    return (
        <>
            <Heading />
            <section className="flex">
                <div className="flex flex-col items-center bg-stone-100 gap-2 py-5 px-3" >
                    <Link to={'find-bus'} className="bg-white rounded-xl py-3 px-5">find bus</Link>
                    <Link to={'history'} className="bg-white rounded-xl py-3 px-5">History</Link>
                </div>
                <div>
                    <Outlet/>
                </div>
            </section>
        </>
    )
}
