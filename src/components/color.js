import imgColor from "../images/Group 429.svg";
import UserName from "./userName";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import "../css/color.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { token } from "./token";
import Loading from "./Loading";

function Color() {

    const { ColorID } = useParams();

    const [name, setname] = useState("");
    const [hex_code, sethex_code] = useState("");

    const [color, setColor] = useState('#F6F6FB');  
    const [showPicker, setShowPicker] = useState(false); 
    const [Name, setName] = useState("Name");

            const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Color",
            text: `Are You Sure You want to delete Color ${id}`,
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

    const handleName = () => {
        setName("");
    }

    const handleInputChange = (event) => {
        setColor(event.target.value);
    };

    const handleColorChange = (newColor) => {
        setColor(newColor.hex); 
        sethex_code(newColor.hex);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker); 
    };

    const blurtogglePicker = () => {
        setShowPicker(false);
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/Colors")
    }
    const [code, setCode] = useState("Code");

    const [item, setItem] = useState([]);

    const getColor = async () => {
      await fetch(`https://united-hanger-2025.up.railway.app//api/colors/${ColorID}`, {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}` 
                }
        }).then((response) => response.json())
        .then(data => setItem(data.color))
    }

    useEffect(() => {
        getColor();
    }, []);

    console.log(item);


    const EditColor = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("hex_code", hex_code);

       await fetch(`https://united-hanger-2025.up.railway.app//api/colors/${ColorID}`, {
            method: "PUT",
            headers: {
                    "Authorization": `Bearer ${token}` 
           },
           body: formData
        }).then((response) => response.json())
        .then(data => console.log(data))
    }

    return (
        <div className="color-departament">
            <div className="heading-color">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgColor} alt="imgColor"/>
                    <p>Color</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            {item.length === 0 ? <Loading />
                :
            <>
            <div className="col-inputs-content">
                <div className="col-Name-Code">
                    <div className="col-name">
                        <p>Name</p>
                        <input
                            onFocus={handleName}
                            onBlur={() => {
                                setName("Name")
                            }}
                                    onClick={blurtogglePicker}
                                    onChange={(e) => {
                                        setname(e.target.value)
                                    }}
                                    type="text" placeholder={item.name} name="Name" />
                    </div>
                    <div className="col-code">
                        <p>Code</p>
                        <input
                            onClick={blurtogglePicker}
                            onFocus={() => {
                            setCode("");
                        }}
                            onBlur={() => {
                                setCode("Code");
                        }}    type="text" placeholder={item.code} name="Code" />
                    </div> 
                </div>
                <div className="col-Hex-code">
                    <p>Hex Code</p>
                    <div>
                        <input
                                value={color}
                                onClick={togglePicker}
                                onChange={handleInputChange}
                                style={{ backgroundColor: color, padding: '10px', borderRadius: '4px' }}
                                type="text" placeholder={item.hex_code} name="Hex Code"
                        />
                        {showPicker && (
                            <div style={{ position: 'absolute', zIndex: 2 , marginTop: "20px"}}>
                                <ChromePicker color={color} onChangeComplete={handleColorChange} />
                             </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-Delete-Edit">
                        <button onClick={() => {
                            handleDelete(item.id)
                }} className="delete">Delete</button>
                        <button className="Edit" onClick={() => {
                            EditColor();
                            handleNavigate();
                        }}>Edit</button>
            </div>
            </>
            }
        </div>
    )
}
export default Color;