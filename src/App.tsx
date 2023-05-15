// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Landing from './pages/landing';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <body>

//       </body>
//     </div>
//   );
// }

// export default App;

import { Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import DailyDose from './pages/DailyDose';
import Home from './pages/Home';
import Register from './pages/Generate';
import Login from './pages/Login';

function App() {

  return (
    <div className="App">
      <Menu currentPage="Home" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/daily-dose" element={<DailyDose />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/generate" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
