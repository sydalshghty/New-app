import Navbar from "./components/navBar";
import Slider from "./components/slider";
import ProductSlider from "./components/productSlider";
import AddNewSlider from "./components/addNewSlider";
import EditSlider from "./components/EditSlider";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import { useNavigate } from "react-router-dom";
import "./app.css";
function App() {
  const navigate = useNavigate("/");

  const navigateP = useNavigate("/Slider");

  return (
    <div>
    <div className="login">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
    </div>
    <div className="app">
      {navigate ? "" : 
      <div className="navbar">
        <Navbar />
      </div>
        }
        {navigateP ? 
          <div className="navbar">
        <Navbar />
          </div> :
          ""
        }
      <div className="content-app">
        <Routes>
          <Route path="Slider" element={<Slider />} />
          <Route path="slider/:sliderID" element={<ProductSlider />} />
          <Route path="/AddNewSlider" element={<AddNewSlider />} />
          <Route path="/EditSlider" element={<EditSlider />} />
          <Route path="slider/:EditSliderId" element={<EditSlider />} />
        </Routes> 
      </div>
      </div>
    </div>
  );
}
export default App;
