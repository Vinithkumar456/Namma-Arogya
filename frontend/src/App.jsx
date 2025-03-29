import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import ChatBox from "./components/ChatBox";
import DoctorLogin from "./components/Doctorlogin";
import DoctorDashBoard from "./components/DoctorDashBoard";
import SymptomInput from "./components/SymptomInput"; // ✅ Import added
import VoiceInput from "./components/SymptomVoiceInput";


const App = () => {
  const userId = "67e6c1e823d1b49b40fe90e7";
  const receiverId = "67e73fa3f56e006cb45c60a8";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctordashboard" element={<DoctorDashBoard />} />

        <Route
          path="/chat"
          element={
            <div className="App p-6 bg-gray-200 min-h-screen flex items-center justify-center">
              <ChatBox userId={userId} receiverId={receiverId} />
            </div>
          }
        />

        {/* ✅ Symptom Input Page */}
        <Route path="/symptoms" element={<SymptomInput />} />
    
        <Route path="/voicesymptoms" element={<VoiceInput />} />
      </Routes>
    </Router>
  );
};

export default App;
