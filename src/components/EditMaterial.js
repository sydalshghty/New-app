import imgMaterial from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/EditMaterial.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";
function EditMaterial() {
    const { MaterialID } = useParams();
    
    const [namePlaceholder, setNamePlaceholder] = useState("Name");

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/RowMaterial");
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Material",
            text: `Are You Sure You want to delete Material ${id}`,
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

    const [Material, setMaterial] = useState([]);

    const getMaterial = async () => {
       await  fetch(`https://united-hanger-2025.up.railway.app//api/materials/${MaterialID}`, {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}` 
                }
        }).then((response) => response.json())
        .then(data => setMaterial(data.material))
    }

    useEffect(() => {
        getMaterial();
    }, [])

    const [newName, setNewName] = useState("");

    const PutMaterial = () => {

        const formData = new FormData();
        formData.append("name", newName);

        fetch(`https://united-hanger-2025.up.railway.app//api/materials/${MaterialID}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then((response) => response.json())
            .then(data => console.log(data));
    }

    return (
        <div className="Edit-Material-Departament">
            <div className="Edit-Material-Heading">
                <div className="col-material">
                    <img onClick={handleNavigate} src={imgMaterial} alt="img-Material"/>
                    <p>Material</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            {Material.length === 0 ? <Loading />
                :
                <>
                    <div className="col-input-material">
                        <p>Name</p>
                        <input
                            onFocus={() => {
                                setNamePlaceholder("")
                            }}
                            onBlur={() => {
                                setNamePlaceholder("Name")
                            }}
                            onChange={(e) => {
                                setNewName(e.target.value);
                            }}
                            type="text" placeholder={Material.name} name="Name-Material" />
                    </div>
                    <div className="col-Delete-Edit">
                        <button onClick={() => {
                            handleDelete(Material.id)
                        }} className="delete">Delete</button>
                        <button className="Edit" onClick={() => {
                            PutMaterial();
                            handleNavigate();
                        }}>Edit</button>
                    </div>
                </>
            }
        </div>
    )
}
export default EditMaterial;