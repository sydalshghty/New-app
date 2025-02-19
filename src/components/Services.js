import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
//import imgProduct from "../images/61GsnUB4HuL 2.png";
import imgEdit from "../images/Group 409.svg";
import imgDelete from "../images/Group 410.svg";
import "../css/services.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { token } from "./token";
import Loading from "./Loading";
function Services() {

    const [services, setServices] = useState([]);

    const fetchData = async () => {
        await fetch("https://united-hanger-2025.up.railway.app/api/services/get_all")
            .then((response) => response.json())
            .then((data) => setServices(data.services));
    }

    useEffect(() => {
        fetchData()
    },[])
 
    console.log(services);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/AddNewServices");
    }

    const handleService = () => {
        navigate("/Service");
    }

    const handleEditService = () => {
        navigate("/EditService");
    }

    const handleDelete = (serviceID) => {

        Swal.fire({
            title: "Delete Service",
            text: `Are You Sure You want to delete Service ${serviceID}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`https://united-hanger-2025.up.railway.app/api/service/${serviceID}`, {
                    method: "Delete",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                .then((data) => fetchData())
            }
        })
    }

    const getBackground = (id) => {
        if ((id % 2 === 0)) {
            return "#ffffff"
        } else {
            return "#f1f2f7"
        }
    }

    return (
        <div className="services-Departament">
            <div className="Services-content">
                <p className="p-Services">Services</p>
                <UserName/>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="heading-Services">
                <p>All Services</p>
                <div className="col-addNew" onClick={handleNavigate}>
                    <AddNew/>
                </div>
            </div>
            {services.length === 0 ? 
                <Loading/>:
                <div className="main-product">
                {services.map((item, index) => {
                    return (
                    <div className="col-Product-slider" key={item.id} style={{backgroundColor: getBackground(item.id)}}>
                            <Link to={`/service/${item.id}`} style={{display: "flex", alignItems: "center"}}>
                                <p className="id-product">{item.id}</p>
                                <img className="img-product" src={item.image_path} alt="img-product" />
                                <div className="col-text" style={{ cursor: "pointer" }} onClick={handleService}>
                                    <h3 className="heading-product">{item.title}</h3>
                                    <p className="description-product">{item.description}</p>
                                </div>
                            </Link>
                        <div className="col-Edit-Delete">
                                <Link to={`/EditService/${item.id}`}>
                                    <img onClick={handleEditService} src={imgEdit} alt="img-Edit" />
                                </Link>
                                <img onClick={() => {
                                    handleDelete(`${item.id}`)
                            }} src={imgDelete} alt="img-Delete" />
                        </div>
                    </div>
                )
                })}
                </div>
            }
                <>
                    {services.map((product, index) => {
                return (
                    <div className="col-product-mobile" key={product.id} style={{backgroundColor: getBackground(product.id)}}>
                        <div className="content-image">
                            <p className="id-product">{product.id}</p>
                            <img className="img-product" style={{width: "120px", height: "120px"}} src={product.image_path} alt="img-product" />
                        </div>
                        <div className="content-text" style={{cursor: "pointer"}} onClick={handleService}>
                            <h3 className="heading-product">{product.title}</h3>
                            <p className="description-product">{product.description}</p>
                        </div>
                        <div className="col-Edit-Delete">
                            <img onClick={handleEditService}  src= {imgEdit} alt="img-Edit" />
                            <img onClick={() => {
                                handleDelete(`${product.id}`);
                                console.log(`${product.id}`)
                            }}  src= {imgDelete} alt="img-Delete"/>
                        </div>
                    </div>
                )
            })}
                </>
        </div>
    )
}
export default Services;