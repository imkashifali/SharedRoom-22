import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screen/Homescreen";
import Bookingscreen from "./screen/Bookingscreen";
import LoginScreen from "./screen/LoginScreen";
import RegistrationScreen from "./screen/RegistrationScreen";
import ProfileScreen from "./screen/ProfileScreen";
import AdminScreen from "./screen/AdminScreen";
import LandingScreen from "./screen/LandingScreen";


function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} exact />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegistrationScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/admin" element={<AdminScreen />} exact />
          <Route path="/" element={<LandingScreen />} exact />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
