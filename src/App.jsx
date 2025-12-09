
import Header from './components/Header';
import Home from './Home';
import SelectLocation from './components/SelectTravelLocation';
import Singin from './singin';
import Singup from './Singup';
import TravelPlaces from './TravelPlaces';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserDashboard from './dashboard_pages/UserDashboard';
import Layout from './components/layout';
import BusResults from './BusResults';
import VerifyOtp from './Verify_otp';
import ResetPassword from './reset_password';
import BusSeatView from './busSeats';
import TicketsHistory from './dashboard_pages/history';
import SearchBus from './dashboard_pages/search_bus';
import PaymentView from './payment';

function App() {


  return (
    <BrowserRouter>
      <Routes >

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' />
          <Route path='/bus-results' element={<BusResults/>}/>
          <Route path='bus-results/seats' element={<BusSeatView/>}/>
          <Route path='/bus-results/seats/payment' element={<PaymentView/>}/>
          {/* <Route path='/singup' element={<Singup />} />
          <Route path='/singin' element={<Singin />} /> */}
        </Route>
        <Route path='/dashboard' element={<UserDashboard/>}>
            <Route path='find-bus/' element={<SearchBus/>}/>
            <Route path='history/' element={<TicketsHistory/>}/>

        </Route>

        <Route path='/singup' element={<Singup />} />
        <Route path='/singin' element={<Singin />} />
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        {/* <Route path='/user-dashboard' element={<UserDashboard />} /> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App
