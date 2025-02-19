import UserName from "./userName";
import imgSize from "../images/Group 429.svg";
import "../css/addNewSize.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { token } from "./token";
function AddNewSize() {

    const [Value, setValue] = useState("Value");
    const [Unit, setUnit] = useState("Unit");

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Sizes");
    }

    const [valueSize, setValueSize] = useState("");
    const [unitSize, setUnitSize] = useState("");

    const AddNewSize = async () => {
        const formData = new FormData();
        formData.append("value", valueSize);
        formData.append("unit", unitSize);

      await fetch(`https://united-hanger-2025.up.railway.app//api/sizes/new`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
          },
          body: formData,
        }).then((response) => response.json())
        .then(data => console.log(data));
    }
    return (
        <div className="AddNewSize-Departament">
            <div className="addNewSize-Heading">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgSize} alt="imgSize"/>
                    <p>Add New Size</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-input-AddNewSize">
                <div className="col-Value">
                    <p>Value</p>
                    <input
                        onFocus={() => {
                            setValue("")
                        }}
                        onBlur={() => {
                            setValue("Value")
                        }}
                        onChange={(e) => {
                            setValueSize(e.target.value)
                        }}
                        type="text" placeholder={Value} name="Value" />
                </div>
                <div className="col-Unit">
                    <p>Unit</p>
                    <input
                        onFocus={() => {
                            setUnit("");
                        }}
                        onBlur={() => {
                            setUnit("Unit");
                        }}
                        onChange={(e) => {
                            setUnitSize(e.target.value)
                        }}
                        type="text" placeholder={Unit} name="Unit" />
                </div>
            </div>
            <div className="Cancel-And-Delete">
                <button className="cancel">Cancel</button>
                <button className="submit" onClick={() => {
                    AddNewSize();
                    handleNavigate();
                }}>Submit</button>
            </div>
        </div>
    )
}
export default AddNewSize;