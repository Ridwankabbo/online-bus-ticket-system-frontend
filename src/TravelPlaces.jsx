import React from "react";  
import Card from "./components/cards";

export default function TravelPlaces(){
    return(
        <section className="text-center py-10 px-20">
            <h3 className="text-[35px] font-semibold">Our most vesited places</h3>
            <div className="flex justify-around flex-wrap gap-10">
                <Card name={"Cox's bazar"} image={"image/cox's_bazar.jpeg"} description={"This is the longest seabetch in the world."}/>
                <Card name={"Sylhet"} image={"image/sylhet.jpeg"} description={"This is one of the most beautiful palce in bangladesh."}/>
                <Card name={"Shundarban"} image={"image/shundarban.jpeg"} description={"This is the largest mangrove forrest in the world."}/>
            </div>
        </section>
    )
}