import UserName from "./userName";
import imgIcon from "../images/Group 429.svg";
import "../css/EditSlider.css";
import { useNavigate } from "react-router-dom";
import imgProduct from "../images/61GsnUB4HuL 2 (2).png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import "../css/EditService.css";

function EditService() {

    const { EditServiceID } = useParams();

    const [EditService, setEditService] = useState([]);

        const handleDelete = () => {
        Swal.fire({
            title: "Delete Service",
            text: "Are You Sure You want to delete Service",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        })
        
    }

    const [title, setTitle] = useState("Title");

    const [description, setDescription] = useState("Description . . . ");

    const navigate = useNavigate();

    const handlNavigate = () => {
        navigate("/Services");
    }

    const getDataService = () => {
        fetch(`https://united-hanger-2025.up.railway.app/api/service/${EditServiceID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        .then(data => setEditService(data.service))
    }

    useEffect(() => {
        getDataService();
    }, []);

    const [TitleService, setTitleService] = useState("");
    const [DescService, setDescService] = useState("");
    
    const putEditService = () => {
        const formData = new FormData();
        formData.append("title", TitleService);
        formData.append("description", DescService);

        fetch(`https://united-hanger-2025.up.railway.app/api/service/${EditServiceID}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then((response) => response.json())
        .then(data => console.log(data))
    }
    
    return (
        <div className="EditSlider-Departament">
            <div className="heading-EditSlider">
                <div className="col-image">
                    <img onClick={handlNavigate} src={imgIcon} alt="imgIcon" />
                    <p>Edit Service</p>
                </div>
                <div className="col-UserName">
                    <UserName/>
                </div>
            </div>
            <div className="col-product-Edit">
                <div className="col-image-product">
                    <img style={{maxWidth: "420px"}} src={EditService.image_path} alt="imgProduct"/>
                </div>
                <div className="content-product-Edit">
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
                                setTitleService(e.target.value)
                            }}
                            type="text" placeholder={EditService.title} />
                    </div>
                    <div className="col-description">
                        <p>Description</p>
                        <input
                            onFocus={() => {
                                setDescription("")
                            }}
                            onBlur={() => {
                                setDescription("Description . . . ")
                            }}
                            onChange={(e) => {
                                setDescService(e.target.value)
                            }}
                            type="text" placeholder={EditService.description} />
                    </div>
                </div>
            </div>
            <div className="col-Delete-Edit">
                <button onClick={handleDelete} className="delete">Delete</button>
                <button className="Edit" onClick={() => {
                    putEditService();
                    handlNavigate();
                }}>Edit</button>
            </div>
       </div> 
    )
}
export default EditService;