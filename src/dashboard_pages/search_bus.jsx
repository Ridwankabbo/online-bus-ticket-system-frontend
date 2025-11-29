import React from "react";
import SelectLocation from "../components/SelectTravelLocation";
const SearchBus = () =>{
    return(
        <>
            <SelectLocation user_auth_token={localStorage.getItem('accessToken')}/>
        </>
    )
}

export default SearchBus;