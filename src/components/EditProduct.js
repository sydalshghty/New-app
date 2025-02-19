import imgProduct from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/EditProduct.css";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./Submit";
import imgDelete from "../images/Vector (8).svg";
import imgEdit from "../images/Group 445.svg";
import closeSquare from "../images/Close-Square.svg";
import ProductEdit from "../images/Group 452.svg";
import { useParams } from "react-router-dom";
import { token } from "./token";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import "../css/ProductSubmit.css";
function EditProduct() {

    const [Product, setProduct] = useState([]);

    const { ProductID } = useParams();
 
    const getProductData = async () => {
        await fetch(`https://united-hanger-2025.up.railway.app/api/products/${ProductID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => setProduct(data.product))
    }

    useEffect(() => {
        getProductData();
    }, [])
    console.log(Product);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Products")
    }

    const backgroundColors = (id) => {
        switch (id % 3) {
            case 1:
                return "#5A67BA"
            case 2:
                return "#ffffff"
            default:
                return "#5A67BA"
        }
    }

    const colorColors = (id) => {
        if ((id % 2 === 1)) {
            return "#ffffff"
        } else {
            return "#8D8D8D"
        }
    }
    return (
        <div className="Edit-Product-Departament">
            <div className="heading-EditProduct">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgProduct} alt="imgIcon" />
                    <p>Edit Product</p>
                </div>
                <div className="col-userName">
                    <UserName/>
                </div>
            </div>
            <SubmitButton />
            <div className="col-images">
                <p>Images</p>
            </div>
            {Product.length === 0 ? <Loading /> : 
                <>
                <div className="Images-Departament">
                <div className="main-Image">
                    <img className="img-Product" src={Product.images[0].image_path} alt="img-Product" />
                    <div className="Delete-Edit-Image">
                        <img src={imgDelete} alt="img-Delete" />
                        <img src={imgEdit} alt="img-Edit"/>
                    </div>
                </div>
                <div className="all-Images-Products">
                    <div className="col-img-product">
                            {Product.images.map((img, index) => {
                                return (
                                    <div key={img.id} className="main-img-product">
                                        <img className="main-img" src={img.image_path} alt="img-Product" />
                                        <div className="Delete-Edit-Img">
                                            <img src={closeSquare} alt="img-Delete" />
                                            <img src={ProductEdit} alt="img-Edit"/>
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                </div>
            </div>
             <div className="content-Product-Submit">
                <div className="Name-Description-Col">
                    <form action="">
                        <div className="col-Name">
                            <label>Name</label>
                            <input type="text" placeholder={Product.name} />
                        </div>
                        <div className="col-Description">
                            <label>Description</label>
                            <input type="text" placeholder={Product.description} />
                        </div>
                    </form>
                    <div className="col-Raw-Material">
                        <h3>Raw Material</h3>
                                <div>
                                    {Product?.materials?.map((material, index) => (
                                    <p style={{ backgroundColor: `${backgroundColors(material.id)}`, color: `${colorColors(material.id)}`}} key={material.id || index}>{material.name}</p>))}
                                </div>
                    </div>
                </div>
                <div className="Colors-Sizes-Col">
                    <div className="Colors-Departament">
                        <h3>Colors</h3>
                        <div className="ALL-Col-Colors">
                            {Product?.colors?.map((color,index) => (
                                <div key={color.id} style={{ backgroundColor: `${backgroundColors(color.id)}`}}>
                                    <li style={{backgroundColor: `${color.name}`}}></li>
                                    <p style={{color: `${colorColors(color.id)}`}}>{color.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="Sizes-Departament">
                        <h3>Sizes</h3>
                        <div className="ALL-Col-Sizes">
                            {Product?.sizes?.map((size,index) => (
                                <p key={size.id} style={{ backgroundColor: `${backgroundColors(size.id)}`, color: `${colorColors(size.id)}`}}>{`${size.value} ${size.unit}`}</p>
                        ))}
                        </div>
                    </div>
                </div>
                </div>
            </>
            }
        </div>
        
    )
}
export default EditProduct;