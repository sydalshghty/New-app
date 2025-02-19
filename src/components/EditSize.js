import imgSize from "../images/Group 429.svg";
import UserName from "./userName";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/EditSize.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";

function EditSize() {

    const { SizeID } = useParams();

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/Sizes")
    }
    const [Value, setValue] = useState("Value");
    const [Unit, setUnit] = useState("Unit");

        const handleDelete = () => {
        Swal.fire({
            title: "Delete Size",
            text: `Are You Sure You want to delete Size ${SizeID}`,
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

    const [size, setSize] = useState([]);

    const getSizeOnly = () => {
        fetch(`https://united-hanger-2025.up.railway.app//api/sizes/${SizeID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        .then(data => setSize(data.size));
    }

    useEffect(() => {
        getSizeOnly();
    }, []);

    console.log(size);

    const [valueSize, setValueSize] = useState("");
    const [unitSize, setUnitSize] = useState("");

    const PutSize = async () => {
        const formData = new FormData();
        formData.append("value", valueSize);
        formData.append("unit", unitSize);

      await fetch(`https://united-hanger-2025.up.railway.app//api/sizes/${SizeID}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
          },
        body: formData,
        }).then((response) => response.json())
        .then(data => console.log(data))
    }

    return (
        <div className="EditSize-Departament">
            <div className="EditSize-Heading">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgSize} alt="imgSize"/>
                    <p>size</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            {size.length === 0 ? <Loading /> :
            <>
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
                        type="text" placeholder={size.value} name="Value" />
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
                        type="text" placeholder={size.unit} name="Unit" />
                </div>
            </div>
            <div className="col-Delete-Edit">
                <button onClick={handleDelete} className="delete">Delete</button>
                        <button className="Edit" onClick={() => {
                            PutSize();
                            handleNavigate();
                        }}>Edit</button>
            </div>
            </>
            }
        </div>
    )
}
export default EditSize;