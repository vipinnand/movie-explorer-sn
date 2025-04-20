import "./App.css";
import Navbar from "./components/Molecule/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/WishlistPage/Wishlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
