import React from "react";
import "./Header_footer.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <section className="flex justify-around items-center p-5 ">

                <div>
                    <h2 className="text-5xl font-bold text-green-700">EasyTravel</h2>
                </div>
                <div className="flex gap-10 items-center">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/singup"  className="bg-green-700 px-5 py-2 rounded-md text-white">Sing up</Link>
                </div>

            </section>

            <section>
                <div className="">

                </div>
            </section>

        </>
    )
}

export default Header;