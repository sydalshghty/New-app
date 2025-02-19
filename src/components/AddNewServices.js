import imgIcon from "../images/Group 429.svg"; 
import UserName from "./userName";
import "../css/addNewSlider.css";
import { useNavigate } from "react-router-dom";
import imgUpload from "../images/Vector (4).svg";
import { useState } from "react";
import "../css/addNewService.css";
import { token } from "./token";
function AddNewService() {
    const navigate = useNavigate();
    const handlNavigate = () => {
        navigate("/Services");
    }

    const [title, setTitle] = useState("Title");

    const [description, setDescription] = useState("Description...");

    const [image, setImage] = useState(null);

    const [titleService, setTitleService] = useState("");

    const [descService, setDescService] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setImage(file); // تخزين الصورة
        }
    };

    const addNewService = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", titleService);
        formData.append("description", descService);

        await fetch("https://united-hanger-2025.up.railway.app//api/services/new",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}` // التوكن
                },
                body: formData
            }
        ).then((response) => response.json())
        .then((data) => console.log(data))
    }

    const handleSubmit = () => {
        addNewService();
        handlNavigate();
    }

    return (
        <div className="addNewSlider-departament">
            <div className="addNewSlider-heading">
                <div className="col-image">
                    <img onClick={handlNavigate} src= {imgIcon} alt="imgIcon" />
                    <p>Add New Service</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="content-upload-product">
                <div className="select-image">
                    <img src={imgUpload} alt="upload-image" />
                    <input onChange={handleImageChange} type="file" />
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
                                setTitleService(e.target.value);
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
                                setDescService(e.target.value);
                            }}
                            type="text" placeholder={description} name="Description-product"
                        />
                    </div>
                </div>
            </div>
            <div className="Cancel-And-Delete">
                <button className="cancel">Cancel</button>
                <button onClick={() => {
                    handleSubmit();
                }} className="submit">Submit</button>
            </div>
        </div>
    )
}
export default AddNewService;