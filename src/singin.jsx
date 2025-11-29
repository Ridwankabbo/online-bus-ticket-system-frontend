import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LOGIN_API_ENDPOINT = 'http://localhost:8000/user/login/api/token/';
const FORGOT_PASSWORD_API_ENDPOINT = 'http://localhost:8000/user/forgot-password/';

export default function Singin() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = await fetch(LOGIN_API_ENDPOINT, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (request.ok) {
                const result = await request.json()
                console.log("successful: ", result);
                
                localStorage.setItem('accessToken', result.access);
                localStorage.setItem('refreshToken', result.refresh);
                navigate('/user-dashboard');
                
                alert('Login successfully!');
            }
            else {
                const result = request.json()
                console.log("Request failed ", result);
                alert("Request failed");

            }

        } catch (error) {
            console.log("Network error");

        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        if (!data.email) {
            alert("Please enter email to reset password")
            return;
        }

        try{
            const request = await fetch(FORGOT_PASSWORD_API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({email:data.email})
                
            });

            if (request.ok){
                const result = request.json()
                console.log(result);
                // navigate('/user-dashboard')
            }
            else{
                alert(`Reset failed ${request.message}`)
            }
        }catch(error){
            console.log(error);
            
        }

    }

    return (
        <section className="item-center bg-[url(image/image_singup_background.jpeg)] h-screen  bg-no-repeat bg-cover opacity-75 m-10 rounded-md">

            <div className="my-0 mx-auto min-h-7/10  w-sm opacity-75 bg-white ">

                <form className="text-center " onSubmit={handleSubmit}>
                    <div className="text-center text-[40px]  font-bold py-5">
                        <h2>Sign in</h2>
                    </div>

                    <div className="p-3">
                        <input type="email" name="email" id="email" placeholder="Ente you Email" onChange={handleChange} value={data.email} className=" bg-stone-200 px-10 py-2 rounded-md" />
                    </div>
                    <div className="p-3">
                        <input type="password" name="password" id="password" placeholder="Enter you password" onChange={handleChange} value={data.password} className=" bg-stone-200 px-10 py-2 rounded-md" />

                    </div>

                    <div>
                        <button type="submit" className=" bg-green-800 text-white px-10 py-2 rounded-md">Submt</button>
                    </div>

                </form>
                <div className=" text-white text-center py-4">
                    <button type="button" onClick={handleForgotPassword} className="bg-red-400 py-2 px-2 rounded-md">Forgot password</button>
                </div>
                <div className="text-center  text-[20px] py-3 font-semibold">
                    <p>Don't have an account?<span><Link to='/singup' className="text-green-500 px-3 ">Sing up</Link></span></p>
                </div>

            </div>


        </section>
    )
}