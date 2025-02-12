import imgReturn from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/addNewMaterial.css";
import { useNavigate } from "react-router-dom";
import "../css/addNewSlider.css";
import { useState } from "react";
import { token } from "./token";

function AddNewMaterial() {

    const [namePlaceholder, setNamePlaceholder] = useState("Name");

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/RowMaterial")
    }

    const [nameMaterial, setNameMaterial] = useState("");

    const AddNewMaterial = async () => {

        const formData = new FormData();
        formData.append("name", nameMaterial);

      await fetch(`/api/materials/new`, {
            method: "POST",
            headers: {
                    "Authorization": `Bearer ${token}` 
          },
            body: formData
        }).then((response) => response.json())
        .then(data => console.log(data))
    }
    return (
        <div className="Add-New-Material-Departament">
            <div className="heading-AddNewMaterial">
                <div className="col-material">
                    <img onClick={handleNavigate} src={imgReturn} alt="imgReturn"/>
                    <p>Add New Material</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
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
                        setNameMaterial(e.target.value)
                    }}
                    type="text" placeholder={namePlaceholder} name="Name-Material" />
            </div>
            <div className="Cancel-And-Delete">
                    <button className="cancel">Cancel</button>
                <button className="submit" onClick={() => {
                    AddNewMaterial();
                    handleNavigate();
                }}>Submit</button>
            </div>
        </div>
    )
}
export default AddNewMaterial;