import Navbar from "./components/navBar";
import Slider from "./components/slider";
import Modules from "./components/modules";
import Inquiries from "./components/inquiries";
import Messages from "./components/massage";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import WhyUS from "./components/WhyUS";
import OurFactory from "./components/OurFactory";
import BusinessHours from "./components/business";
import ProductSlider from "./components/productSlider";
import AddNewSlider from "./components/addNewSlider";
import EditSlider from "./components/EditSlider";
import RowMaterial from "./components/RowMaterial";
import EditMaterial from "./components/EditMaterial";
import AddNewMaterial from "./components/addNewMaterial";
import Sizes from "./components/Sizes";
import AddNewSize from "./components/addNewSize";
import EditSize from "./components/EditSize";
import Colors from "./components/Colors";
import Color from "./components/color";
import { Routes, Route } from "react-router-dom";
import AddNewColor from "./components/addNewColor";
import AddNewServices from "./components/AddNewServices";
import Service from "./components/service";
import EditService from "./components/EditService";
import AddNewMessage from "./components/AddNewMessage";
import AddNewProduct from "./components/AddNewProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/login";
import ViewInquiry from "./components/ViewInquiry";
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
          <Route path="Products" element={<Modules />}/>
          <Route path="Slider" element={<Slider />} />
          <Route path="Inquiries" element={<Inquiries />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="Services" element={<Services />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="WhyUS" element={<WhyUS />} />
          <Route path="OurFactory" element={<OurFactory />} />
          <Route path="BusinessHours" element={<BusinessHours />} />
          <Route path="slider/:sliderID" element={<ProductSlider />} />
          <Route path="/AddNewSlider" element={<AddNewSlider />} />
          <Route path="/EditSlider" element={<EditSlider />} />
          <Route path="RowMaterial" element={<RowMaterial />} />
          <Route path="/material" element={<EditMaterial />} />
          <Route path="/addNewMaterial" element={<AddNewMaterial />} />
          <Route path="Sizes" element={<Sizes />} />
          <Route path="/AddNewSize" element={<AddNewSize />} />
          <Route path="/EditSize" element={<EditSize />} />
          <Route path="Colors" element={<Colors />} />
          <Route path="/color" element={<Color />} />
          <Route path="/AddNewColor" element={<AddNewColor />} />
          <Route path="/AddNewServices" element={<AddNewServices />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/EditService" element={<EditService />} />
          <Route path="/AddNewMessage" element={<AddNewMessage />} />
          <Route path="/AddNewProduct" element={<AddNewProduct />} />
          <Route path="/EditProduct" element={<EditProduct />} />
          <Route path="slider/:EditSliderId" element={<EditSlider />} />
          <Route path="products/:ProductID" element={<EditProduct />} />
          <Route path="service/:serviceID" element={<Service />} />
          <Route path="EditService/:EditServiceID" element={<EditService />} />
          <Route path="colors/:ColorID" element={<Color />} />
          <Route path="materials/:MaterialID" element={<EditMaterial />} />
          <Route path="sizes/:SizeID" element={<EditSize />} />
          <Route path="/ViewInquiry" element={<ViewInquiry/>}/>
        </Routes> 
      </div>
      </div>
    </div>
  );
}
export default App;
