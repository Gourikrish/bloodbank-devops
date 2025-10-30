import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import LoginAdmin from './Components/LoginAdmin';
import DonorSignup from './Components/SignupDonor';
import AdminDashboard from './Components/AdminDashboard';
import UpdateUser from './Components/UpdateUser';
import AdminSignup from './Components/SignupAdmin';
import NavBar from './Components/NavBar';
import DonorLogin from './Components/LoginDonor';
import DonorDashboard from './Components/DonorDashboard';
import SearchBlood from './Components/SearchBlood';

function App() {
  return (
    <div className="App">

      <NavBar />
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-blood" element={<SearchBlood />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path='/donor/signup' element={<DonorSignup />} />
        <Route path='/admin/update' element={<UpdateUser />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/signup' element={<AdminSignup />} />
        <Route path='/donor/login' element={<DonorLogin />} />
        <Route path='/donor/dashboard' element={<DonorDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
