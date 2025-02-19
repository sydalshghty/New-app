import "../css/productSlider.css";
import iconSlider from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/userName.css";
import { useNavigate } from "react-router-dom";
import AddNew from "./addNew";
import "../css/addNew.css";
//import imgProduct from "../images/61GsnUB4HuL 2 (1).png";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import { useEffect, useState } from "react";
import Loading from "./Loading";
function Service() {

    const { serviceID } = useParams();

    const [service, setService] = useState([]);

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

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Services")
    }

    const handleNavigateAddNew = () => {
        navigate("/AddNewServices")
    }

    const handleNavigateEditService = () => {
        navigate("/EditService")
    }
 
    const getServiceData = async () => {
       await  fetch(`https://united-hanger-2025.up.railway.app/api/service/${serviceID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
       }).then((response) => response.json())
        .then(data => setService(data.service))
    }

    useEffect(() => {
        getServiceData();
    }, [])
    
    console.log(service);

    return (
        <div className="productSlider-departament">
            <div className="header-slider">
                <div className="heading">
                    <img src={iconSlider} alt="imgProduct" onClick={handleNavigate} />
                    <p>Service</p>
                </div>
                <UserName/>
            </div>
            <div className="addNew-col" onClick={handleNavigateAddNew}>
                <AddNew/>
            </div>
            {service.length === 0 ? <Loading /> :
            <>
                    <div className="col-product">
                        <div className="col-image">
                            <img src={service.image_path} alt="productimg"/>
                        </div>
                        <div className="information-product">
                            <div className="title-content">
                                <p>Title</p>
                                <p>{service.title}</p>
                            </div>
                            <div className="description-content">
                                <p>Description</p>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="Edit-And-Delete">
                        <button onClick={handleDelete} className="Delete">Delete</button>
                        <button  className="Edit">Edit</button>
                    </div>
            </>
            }
        </div>
    )
}
export default Service;