import "../css/AddNewProduct.css";
import imgProduct from "../images/Group 429.svg";
import UserName from "./userName";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./Submit";
import imgSelect from "../images/Vector (2).png";
import { useState } from "react";
import { token } from "./token";

function AddNewProduct() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Products");
    };

    const [Title, setTitle] = useState("Title");
    const [Description, setDescription] = useState("Description . . .");

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage1(file);
        }
    };
    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage2(file);
        }
    };
    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage3(file);
        }
    };
    const handleImageChange3 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage4(file);
        }
    };

    const images = [image1, image2, image3, image4];

    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const materials = [
        { id: 2, name: "ABS" },
        { id: 3, name: "HIPS" },
    ];

    const sizes = [
        { id: 2, name: "30 CM" },
        { id: 3, name: "36 CM" },
    ];

    const colors = [
        { id: 1, name:"Black", colorCode: "#000000" },
        { id: 2,name: "White", colorCode: "#FFFFFF" },
        { id: 3, name: "Red", colorCode: "#FF0000" },
    ];

    const handleSelectMaterial = (id) => {
        setSelectedMaterials((prev) =>
            prev.includes(id)
                ? prev.filter((materialId) => materialId !== id)
                : [...prev, id]
        );
    };

    const handleSelectSize = (id) => {
        setSelectedSizes((prev) =>
            prev.includes(id)
                ? prev.filter((sizeId) => sizeId !== id)
                : [...prev, id]
        );
    };

    const handleSelectColor = (id) => {
        setSelectedColors((prev) =>
            prev.includes(id)
                ? prev.filter((colorId) => colorId !== id)
                : [...prev, id]
        );
    };

    const [name, setName] = useState("");

    const AddNewProduct = async () => {

        const productData = {
        name: name,
        color_ids: selectedColors, 
        size_ids: selectedSizes,      
        material_ids: selectedMaterials, 
        };

        
        const formData = new FormData();
        formData.append("product_data", JSON.stringify(productData));
        formData.append("images", image1);
        formData.append("images", image2);
        formData.append("images", image3);
        formData.append("images", image4);

        await fetch(`https://united-hanger-2025.up.railway.app/api/products/new`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        }).then((response) => response.json())
            .then(data => console.log({
                data,
                images,
                productData
        }))
}
    
    return (
        <div className="Add-New-Product-Departament">
            <div className="heading-AddNewProduct">
                <div className="col-image">
                    <img onClick={handleNavigate} src={imgProduct} alt="img-Product" />
                    <p>Add New Product</p>
                </div>
                <div className="col-UserName">
                    <UserName />
                </div>
            </div>
            <div
                className="submit-col"
                onClick={() => {
                    AddNewProduct();
                    handleNavigate();
                    console.log({
                        images,
                        name,
                        selectedMaterials,
                    });
                }}
            >
                <SubmitButton />
            </div>
            <div className="heading-image">
                <p>Images</p>
            </div>
            <div className="col-Select-Image">
                <div className="select-Image-One">
                    <div className="col-select">
                        <input type="file" onChange={handleImageChange} name="Img-Product" />
                        <img src={imgSelect} alt="img-Select" />
                        <p>Select Main Image</p>
                        {image1 ? (
                            <img
                                className="img-upload"
                                src={URL.createObjectURL(image1)}
                                alt="Uploaded"
                                style={{
                                    position: "absolute",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="select-Image-Two">
                    <div className="col-one">
                        <div className="select-Image-Product">
                            <div className="content-image">
                                <input type="file" onChange={handleImageChange1} name="img-Product" />
                                <img src={imgSelect} alt="img-Select" />
                                <p>Select Image</p>
                                {image2 ? (
                                    <img
                                        className="img-upload"
                                        src={URL.createObjectURL(image2)}
                                        alt="Uploaded"
                                        style={{
                                            position: "absolute",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className="select-Image-Product">
                            <div className="content-image">
                                <input onChange={handleImageChange2} type="file" name="img-Product" />
                                <img src={imgSelect} alt="img-Select" />
                                <p>Select Image</p>
                                {image3 ? (
                                    <img
                                        className="img-upload"
                                        src={URL.createObjectURL(image3)}
                                        alt="Uploaded"
                                        style={{
                                            position: "absolute",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-two">
                        <div className="select-Image-Product">
                            <div className="content-image">
                                <input onChange={handleImageChange3} type="file" name="img-Product" />
                                <img src={imgSelect} alt="img-Select" />
                                <p>Select Image</p>
                                {image4 ? (
                                    <img
                                        className="img-upload"
                                        src={URL.createObjectURL(image4)}
                                        alt="Uploaded"
                                        style={{
                                            position: "absolute",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-Product-Submit">
                <div className="Name-Description-Col">
                    <form action="">
                        <div className="col-Name">
                            <label>Name</label>
                            <input
                                onFocus={() => {
                                    setTitle("");
                                }}
                                onBlur={() => {
                                    setTitle("Title");
                                }}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                type="text"
                                placeholder={Title}
                            />
                        </div>
                        <div className="col-Description">
                            <label>Description</label>
                            <input
                                onFocus={() => {
                                    setDescription("");
                                }}
                                onBlur={() => {
                                    setDescription("Description . . .");
                                }}
                                type="text"
                                placeholder={Description}
                            />
                        </div>
                    </form>
                    <div className="col-Raw-Material">
                        <h3>Raw Material</h3>
                        <div>
                            {materials.map((material) => (
                                <p
                                    key={material.id}
                                    className={`material-item ${
                                        selectedMaterials.includes(material.id) ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectMaterial(material.id)}
                                >
                                    {material.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="Colors-Sizes-Col">
                    <div className="Colors-Departament">
                        <h3>Colors</h3>
                        <div className="ALL-Col-Colors">
                            {colors.map((color) => (
                                <div
                                    key={color.id}
                                    className={`color-item ${
                                        selectedColors.includes(color.id) ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectColor(color.id)}
                                >
                                    <li style={{ backgroundColor: color.colorCode }}></li>
                                    <p>{color.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="Sizes-Departament">
                        <h3>Sizes</h3>
                        <div className="ALL-Col-Sizes">
                            {sizes.map((size) => (
                                <p
                                    key={size.id}
                                    className={`size-item ${
                                        selectedSizes.includes(size.id) ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectSize(size.id)}
                                >
                                    {size.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewProduct;

