import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashBoard.css';

/*************  ✨ Codeium Command ⭐  *************/
/******  b446bbe2-045c-4152-b5dd-2933ae8638e7  *******/
const Doctordashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Chat Section */}
      <Link to="/chat" className="w-1/2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full p-4 inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-white text-3xl font-bold">Chat</h2>
          <p className="text-white text-lg mt-2">Connect through messages</p>
        </div>
      </Link>

      {/* Video Call Section */}
      <Link to="/video-call" className="w-1/2 bg-green-500 hover:bg-green-600 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full p-4 inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-white text-3xl font-bold">Video Call</h2>
          <p className="text-white text-lg mt-2">Face-to-face conversation</p>
        </div>
      </Link>
    </div>
  );
};
export default Doctordashboard;
