import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import PGList from "./pages/PGList";
import AddPG from "./pages/AddPG";
import Login from "./pages/Login";
import PGDetails from "./pages/PGDetails";
import EditPG from "./pages/EditPG";
import MyPGs from "./pages/MyPGs";
import Favorites from "./pages/Favorites";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <div className="p-4 bg-blue-500 flex gap-4 text-white">
        <Link to="/">🏠 Home</Link>

        <Link to="/dashboard">
  📊 Dashboard
</Link>

        <Link to="/add-pg">
          ➕ Add PG
        </Link>

        <Link to="/favorites">
          ❤️ Favorites
        </Link>

        <Link to="/my-bookings">
          📅 My Bookings
        </Link>

        <Link to="/mypgs">
          🏠 My PGs
        </Link>

        <Link to="/login">
          🔐 Login
        </Link>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<PGList />} />

        <Route path="/login" element={<Login />} />

        <Route path="/add-pg" element={<AddPG />} />

        <Route path="/pg/:id" element={<PGDetails />} />

        <Route path="/edit/:id" element={<EditPG />} />

        <Route path="/mypgs" element={<MyPGs />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/my-bookings" element={<MyBookings />}/>

        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;