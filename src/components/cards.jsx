import React from "react";
function Card({ name, image, description }) {
    return (
        <div className="flex flex-col items-center px-3 py-5 text-center bg-stone-100 rounded-md">
            <h2 className="pb-2 text-2xl ">{name}</h2>
            <img className="pb-2 rounded-sm " src={image} alt="image" />
            <p className="pb-2">{description}</p>
        </div>
    )
}

export default Card;