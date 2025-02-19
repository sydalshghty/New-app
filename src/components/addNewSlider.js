import imgIcon from "../images/Group 429.svg"; 
import UserName from "./userName";
import "../css/addNewSlider.css";
import { useNavigate } from "react-router-dom";
import imgUpload from "../images/Vector (4).svg";
import { useState } from "react";
import { token } from "./token";
//import axios from "axios";
function AddNewSlider() {

    
    const navigate = useNavigate();
    const handlNavigate = () => {
        navigate("/Slider");
    }

    const [title, setTitle] = useState("Title");

    const [description, setDescription] = useState("Description...");


    
  const [sliderTitle, setSliderTitle] = useState(""); // حقل العنوان
    const [sliderDescription, setSliderDescription] = useState(""); // حقل الوصف
    const [image, setImage] = useState(null); // حقل الصورة

    const handleNavigateSlider = () => {
        navigate("/Slider"); // التوجيه إلى صفحة السلايدر
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setImage(file); // تخزين الصورة
        }
    };

    const sendDataSlider = async () => {
        const formData = new FormData();
        formData.append("image", image); // إضافة الصورة
        formData.append("title", sliderTitle); // إضافة العنوان
        formData.append("description", sliderDescription); // إضافة الوصف

        try {
            const response = await fetch("https://united-hanger-2025.up.railway.app/api/new_slider", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}` // التوكن
                },
                body: formData // البيانات
            });

            const data = await response.json();
            console.log("Response from server:", data); // استجابة السيرفر
        } catch (error) {
            console.error("Error sending data:", error); // عرض الأخطاء
        }
    };

    return (
        <div className="addNewSlider-departament">
            <div className="addNewSlider-heading">
                <div className="col-image">
                    <img onClick={handlNavigate} src= {imgIcon} alt="imgIcon" />
                    <p>Add New Slider</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="content-upload-product">
                <div className="select-image" style={{ position: "relative" }}>
                    <img className="img-Select" src={imgUpload} alt="img-Upload"/>
                        <input className="choose-file" type="file" onChange={handleImageChange}></input>
                    <p>Select Image to upload</p>
                    {image ? <img
                                className="img-upload"
                                src={image}
                                alt="Uploaded"
                                style={{
                                position: "absolute",
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain", 
                     }}
                                /> : null}
                </div>
                <div className="product-content">
                    <div className="col-title">
                        <p>Title</p>
                        <input
                            onFocus={() => {
                                setTitle("")
                            }}
                            onBlur={() => {
                                setTitle("Title")
                            }}
                            onChange={(e) => {
                                setSliderTitle(e.target.value);
                            }}
                            type="text" placeholder={title} name="title-product" />
                    </div>
                    <div className="col-description">
                        <p>Description</p>
                        <input
                            onFocus={() => {
                                setDescription("")
                            }}
                            onBlur={() => {
                                setDescription("Description...")
                            }}
                            onChange={(e) => {
                                setSliderDescription(e.target.value);
                            }}
                            type="text" placeholder={description} name="Description-product"
                        />
                    </div>
                </div>
            </div>
            <div className="Cancel-And-Delete">
                <button className="cancel">Cancel</button>
                <button onClick={() => {
                    sendDataSlider()
                    handlNavigate();
                    console.log({
                        sliderTitle,
                        sliderDescription
                    })
                }} className="submit">Submit</button>
            </div>
        </div>
    )
}
export default AddNewSlider;