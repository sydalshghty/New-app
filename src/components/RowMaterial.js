import UserName from "./userName";
import "../css/rawMaterial.css";
import SearchInput from "./searchInput";
import "../css/searchInput.css";
import AddNew from "./addNew";
import deleteIcon from "../images/Group 410.svg";
import editIcon from "../images/Group 409.svg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { token } from "./token";
import { useEffect, useState } from "react";
import Loading from "./Loading";
function RowMaterial() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/material");
    }

    const navigate2 = useNavigate();

    const handleNavigate2 = () => {
        navigate2("/addNewMaterial");
    }

    const handleDelete = (MaterialID) => {

        Swal.fire({
            title: "Delete Material",
            text: `Are You Sure You want to delete material ${MaterialID}`,
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
                fetch(`https://united-hanger-2025.up.railway.app//api/materials/${MaterialID}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => response.json())
                    .then(data => getAllMaterials());
            }
        })
    }

    const [materials, setMaterials] = useState([]);

    const getAllMaterials = async () => {
      await fetch(`https://united-hanger-2025.up.railway.app//api/materials`, {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}` 
                }
        }).then((response) => response.json())
        .then(data => setMaterials(data.materials))
    }

    useEffect(() => {
        getAllMaterials();
    }, [])
    
    const backgroundColor = (id) => {
        if ((id % 2) === 0) {
            return "#ffffff";
        } else {
            return "#f1f2f7";
        }
    }

    return (
        <div className="raw-material-Departament">
            <div className="heading-rawmaterial">
                <div className="text-title">
                    <p>Row Material</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="All-Row-Material">
                <div className="text">
                    <p>All Row Material</p>
                </div>
                <div className="col-addNew" onClick={handleNavigate2}>
                    <AddNew/>
                </div>
            </div>
            {materials.length === 0 ? <Loading /> 
                : 
                <>
                    {materials.map((material, index) => {
                        return (
                            <div className="col-main-product">
                                <div className="container-product" key={material.id} style={{backgroundColor: backgroundColor(material.id)}}>
                                    <Link to={`/materials/${material.id}`} style={{textDecoration: "none",width: "100%"}}>
                                        <div className="contain-text">
                                            <p className="id-product">{material.id}</p>
                                            <p className="title-product">{material.name}</p>
                                        </div>
                                    </Link>
                                    <div className="col-Edit-Delete">
                                        <img className="deleteIcon" src={deleteIcon} alt="deleteIcon" onClick={() => {
                                            handleDelete(`${material.id}`)
                                        }} />
                                        <Link to={`/materials/${material.id}`}>
                                            <img  className="editIcon"src={editIcon} alt="editIcon"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                })}
                </>
            }
        </div>
    )
}
export default RowMaterial;