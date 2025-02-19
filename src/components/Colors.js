import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import imgDelete from "../images/Group 410.svg";
import imgEdit from "../images/Group 409.svg";
import "../css/colors.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { token } from "./token";
import Loading from "./Loading";

function Colors() {

    const [AllColors, setAllColors] = useState([]);

    const getAllColors = async () => {
        await fetch("https://united-hanger-2025.up.railway.app//api/colors", {
          method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}` 
                }
      })
        .then((response) => response.json())
        .then((data) => setAllColors(data.colors))
    }

    useEffect(() => {
        getAllColors()
    }, [])
    
    console.log(AllColors);

    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate("/AddNewColor");
    }
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
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`https://united-hanger-2025.up.railway.app//api/colors/${id}`, {
                    method: "DELETE",
                    headers: {
                    "Authorization": `Bearer ${token}` 
                    }
                }).then((response) => response.json())
                .then(data => getAllColors())
            }
        })
    }

    const backgroundProduct = (id) => {
        if ((id % 2 === 0)) {
            return "#ffffff"
        } else {
            return "#f1f2f7"
        }
    }

    return (
        <div className="colors-Departament">
            <div className="heading-colors">
                <p className="title-colors">Colors</p>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="all-colors">
                <p>All Colors</p>
                <div className="addNew-Button" onClick={handleAddNew}>
                    <AddNew/>
                </div>
            </div> 
            {AllColors.length === 0 ? <Loading/> :
                AllColors.map((color,index) => {
                    return (
                <div className="main-product-colors" key={color.id}>
                    <div className="content-product" style={{backgroundColor: backgroundProduct(`${color.id}`)}}>
                        <Link to={`/colors/${color.id}`} style={{textDecoration: "none", display: "flex", width: "100%"}}>
                        <div className="col-text">
                            <p className="id-product">{color.id}</p>
                            <p className="background-color" style={{ backgroundColor: `${color.hex_code}`}}></p>
                            <p className="title-product">{color.name}</p>
                        </div>    
                        </Link>
                        <div className="Edit-Delete-Col">
                                    <img onClick={() => {
                                        handleDelete(`${color.id}`)
                            }} className="img-Delete" src={imgDelete} alt="img-Delete" />
                            <Link to={`/colors/${color.id}`}>
                                <img  className="img-Edit" src={imgEdit} alt="img-Edit"/>
                            </Link>
                        </div>
                    </div>
                </div>
                    )
                })}      
        </div>
    )
}
export default Colors;