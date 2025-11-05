
import Header from "./components/Header";
import Footer from './components/footer';
import SelectLocation from "./SelectTravelLocation";
import TravelPlaces from "./TravelPlaces";

export default function Home(){
    return(
        <>
            <section>
                <div className="bg-[url(image/web-background.jpg)] h-[400px] bg-no-repeat bg-cover bg-center rounded-md mx-20 ">
                    <h3 className="text-white text-7xl text-center py-15 font-bold ">Welcome to our Trevel web site</h3>
                </div>
                {/* <img src="image/web-background.jpg" alt="" /> */}
            </section>
            <SelectLocation/>
            <TravelPlaces/>
            <Footer/>
        </>
    )
}