// import "./App.css";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import ArtPage from "./pages/ArtPage";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const AtHomePage = location.pathname === "/";
  return (
    <div className={AtHomePage ? "bg-blue-900 " : ""}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/art/:id" element={<ArtPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
