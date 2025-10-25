
import './App.css'
import Header from './components/Header';
import Home from './Home';
import SelectLocation from './SelectTravelLocation';
import Singin from './components/singin';
import Singup from './components/Singup';
import TravelPlaces from './TravelPlaces';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import Layout from './components/layout';
import BusResults from './BusResults';
import VerifyOtp from './components/Verify_otp';
import ResetPassword from './components/reset_password';

function App() {


  return (
    <BrowserRouter>
      <Routes >

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' />
          <Route path='/bus-results' element={<BusResults/>}/>
          {/* <Route path='/singup' element={<Singup />} />
          <Route path='/singin' element={<Singin />} /> */}
        </Route>

        <Route path='/singup' element={<Singup />} />
        <Route path='/singin' element={<Singin />} />
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/user-dashboard' element={<UserDashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
