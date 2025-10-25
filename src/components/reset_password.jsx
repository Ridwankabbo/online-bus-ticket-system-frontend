import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const API_ENDPOINT = 'http://localhost:8000/users/reset-password/'
export default function ResetPassword() {
    const [data, setData] = useState({
        email:"",
        otp:"",
        password:""
    });

    const navigate = useNavigate()

    const handleChange= (e) =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) =>{
       e.preventDefault();

        try {
            const request = await fetch(API_ENDPOINT,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });

            if(request.ok){
                const result = request.json()
                console.log("successful: ", result);
                navigate('/login');
                setFormData({ otp: '', email: '', password: '' });
                alert('password reset successfully!');
            }
            else{
                const result = request.json()
                console.log("Request failed ", result);
                alert("Request failed");
                
            }

        } catch (error) {
            console.log("Network error");
            
        }
    }

   
    return (
        <section className="item-center bg-[url(image/image_singup_background.jpeg)] h-screen  bg-no-repeat bg-cover opacity-75 m-10 rounded-md">

            <div className="my-0 mx-auto min-h-7/10  w-sm opacity-75 bg-white ">

                <form className="text-center " onSubmit={handleSubmit}>
                    <div className="text-center text-[40px]  font-bold py-5">
                        <h2>Sign up</h2>
                    </div>
                    
                    <div className="p-3">
                        <input type="email" name="email" id="email" placeholder="Ente you Email" onChange={handleChange} value={data.email} className=" bg-stone-200 px-10 py-2 rounded-md" />
                    </div>
                    <div className="p-3">
                        <input type="text" name="otp" id="otp" placeholder="Enter otp" onChange={handleChange} value={data.otp} className=" bg-stone-200 px-10 py-2 rounded-md" />
                    </div>
                    <div className="p-3">
                        <input type="password" name="password" id="password" placeholder="Enter you password" onChange={handleChange} value={data.password} className=" bg-stone-200 px-10 py-2 rounded-md" />

                    </div>

                    <div>
                        <button type="submit" className=" bg-green-800 text-white px-10 py-2 rounded-md">Submt</button>
                    </div>

                </form>
            </div>


        </section>
    )
}