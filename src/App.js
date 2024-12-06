import './styles/app.css';
import Login from "./component/login";
import Notelist from "./component/notelist";
import Profile from "./component/profile";
import Users from "./component/users";
import Logout from "./component/logout";
import home from "./img/home.png";
import user from "./img/user1.png";
import users from "./img/group.png";
import logout from "./img/logout.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    
    <div className="App">
      {!isConnected ? (
        <Login setIsConnected={setIsConnected} />
      ) : (
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Notelist />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/users" element={<Users />} /> */}
              <Route path="/logout" element={<Logout/>} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

// Fixed Navbar Component
const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <div className='first-part'>
          <Link to="/" ><img src={home}/> Home</Link>
          <Link to="/profile"><img src={user} /> Profile</Link>
          {/* <Link to="/users"><img src={users}/> Users</Link> */}
        </div>
        <div className='last-part'>
          <Link to="/logout"><img src={logout}/> Logout</Link>
        </div>
      </nav>
    </div>
  );
};
