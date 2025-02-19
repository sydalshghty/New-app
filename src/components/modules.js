import UserName from "./userName";
import SearchInput from "./searchInput";
import AddNew from "./addNew";
import { Link, useNavigate } from "react-router-dom";
import "../css/products.css";
import imgEdit from "../images/Group 409.svg";
import imgDelete from "../images/Group 410.svg";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { token } from "./token";
//import Navbar from "./navBar";

function Modules() {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        await fetch("https://united-hanger-2025.up.railway.app/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    
    console.log(products);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/AddNewProduct")
    }

    const handleNavigateEdit = () => {
        navigate("/EditProduct")
    }

        const handleDelete = (productID) => {

        Swal.fire({
            title: "Delete Product",
            text: `Are You Sure You want to delete Product ${productID}`,
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
                fetch(`https://united-hanger-2025.up.railway.app/api/products/${productID}`, {
                   method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }, 
                }).then((response) => response.json())
                .then(data => getAllProducts())
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
        <>
        <div className="products-Departament">
            <div className="products-heading">
                <p className="products-title">Products</p>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <div className="col-search">
                <SearchInput/>
            </div>
            <div className="AllProducts-Col">
                <p>All Products</p>
                <div className="addNew-Col" onClick={handleNavigate}>
                    <AddNew/>
                </div>
            </div>
            {products.length === 0 ? <Loading /> : 
                products.map((product, index) => {
                    return (
                        <div className="main-Product" key={product.id} >
                            <div className="container-Product" style={{backgroundColor: getBackground(`${product.id}`)}}>
                                <Link to={`/products/${product.id}`} style={{display: "flex", alignItems: "center", textDecoration: "none"}}>
                                        <p className="product-id">{product.id}</p>
                                        <img style={{width: "120px", height: "100px"}} className="img-product" src={product.images[0].image_path} alt="img-Product" />
                                        <div className="content-product">
                                            <h3>{product.name}</h3>
                                            <div style={{display: "flex"}}>
                                                {product.sizes.map((size,index) => {
                                                return (
                                                    <div key={size.id}>
                                                        <p style={{display: "flex"}} className="size-product">{`${size.value} ${size.unit}.`}</p>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                            <div style={{display: "flex"}}>
                                                {product.materials.map((material,index) => {
                                                return (
                                                    <div key={material.id}>
                                                        <p className="model-product">{material.name}.</p>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                            <div style={{display: "flex"}}>
                                                {product.colors.map((color,index) => {
                                                return (
                                                    <ul key={color.id} className="bullets-Product">
                                                        <li style={{backgroundColor: `${color.name}`}}></li>
                                                    </ul>
                                                )
                                            })}
                                            </div>
                                        </div>
                                </Link>
                                <div className="Edit-Delete-Col">
                                    <Link to={`/products/${product.id}`}>
                                        <img className="img-Edit" src={imgEdit} alt="img-Edit" />
                                    </Link>
                                    <img onClick={() => {
                                        handleDelete(`${product.id}`);
                                    }} className="img-Delete" src={imgDelete} alt="img-Delete"/>
                                </div>
                            </div>
                        </div>
                    )
            })}
        </div>
        </>
    )
}
export default Modules;