import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import deleteImg from "../images/Group 410.svg";
import EditImg from "../images/Group 409.svg";
import "../css/sizes.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { token } from "./token";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Sizes() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/AddNewSize");
    }

    const handleNavigateSize = () => {
        navigate("/EditSize");
    }

        const handleDelete = (id) => {

        Swal.fire({
            title: "Delete Size",
            text: `Are You Sure You want to delete Size ${id}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            customClass: {
                popup: "my-Popup",
                title: "my-title",
                confirmButton: "my-delete",
                cancelButton: "my-cancel",
            }
        }).then(data => {
            if (data.isConfirmed) {
                fetch(`https://united-hanger-2025.up.railway.app//api/sizes/${id}`, {
                    method: "DELETE",
                    headers: {
                            "Authorization": `Bearer ${token}`
                    }
                }).then((response) => response.json())
                .then(data => console.log(data))
            } else {
                return false;
            }
        })
    }

    const [sizes, setSizes] = useState([]);

    const getAllSizes = () => {
        fetch(`https://united-hanger-2025.up.railway.app//api/sizes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => response.json())
        .then(data => setSizes(data.sizes));
    }

    useEffect(() => {
        getAllSizes();
    }, [])
    
    console.log(sizes);

    const backgroundSize = (id) => {
        if ((id % 2) === 0) {
            return "#FFFFFF";
        } else {
            return "#f1f2f7";
        }
    }

    return (
        <div className="sizes-Departament">
            <div className="heading-sizes">
                <p className="p-title">Sizes</p>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="col-All-Sizes">
                <p>All Sizes</p>
                <div className="add-New" onClick={handleNavigate}>
                    <AddNew/>
                </div>
            </div>
            {sizes.length === 0 ? <Loading /> :
            <div className="main-product-sizes">
                {sizes.map((size,index) => {
                        return (
                         <div className="content-product-size" key={size.id} style={{backgroundColor: backgroundSize(size.id)}}>
                                <Link to={`/sizes/${size.id}`} style={{display: "flex",alignItems: "center", textDecoration: "none",width: "100%"}}>
                                    <p className="id-product">{size.id}</p>
                                    <p className="title-product">{`${size.value} ${size.unit}`}</p>
                                </Link>
                                <div className="Edit-Delete-col">
                                    <img onClick={() => {
                                        handleDelete(size.id);
                                        getAllSizes();
                                    }} className="delete-Img" src={deleteImg} alt="delete-Img" />
                                    <Link to={`/sizes/${size.id}`}>
                                        <img className="edit-Img" src={EditImg} alt="Edit-Img"/>
                                    </Link>
                                </div>
                        </div>
                     )
                 })}   
            </div>
            }
        </div>
    )
}
export default Sizes;