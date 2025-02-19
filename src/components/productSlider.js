import "../css/productSlider.css";
import iconSlider from "../images/Group 429.svg";
import UserName from "./userName";
import "../css/userName.css";
import { useNavigate } from "react-router-dom";
import AddNew from "./addNew";
import "../css/addNew.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import { token } from "./token";
function ProductSlider() {

    const [Slider, setSlider] = useState([]);

    const { sliderID } = useParams();

    console.log({
        sliderId: sliderID
    })
    const fetchData = async () => {
       await fetch(`https://united-hanger-2025.up.railway.app/api/slider/${sliderID}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
       }).then((response) => response.json())
        .then((data) => setSlider(data.slider))
    }

    useEffect(() => {
        fetchData()
    }, []);
const [EditTitle, setEditTitle] = useState("");
    const [EditDescription, setEditDescription] = useState("");
    const [EditImage, setEditImage] = useState(null); // الصورة المعدلة

    const EditSliderData = async () => {
        const formData = new FormData();
        formData.append("title", EditTitle);
        formData.append("description", EditDescription);

        // إذا كانت هناك صورة معدلة أضفها
        if (EditImage) {
            formData.append("image", EditImage);
        }

        console.log("FormData content:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const response = await fetch(`https://united-hanger-2025.up.railway.app/api/slider/${sliderID}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("Response from server:", data);

            if (response.ok) {
                alert("Slider updated successfully!");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating slider:", error);
        }
    };

   /* const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setEditImage(file);
        }
    };*/

    const handleDelete = () => {
        Swal.fire({
            title: "Delete Slider",
            text: "Are You Sure You want to delete Slider",
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

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Slider")
    }

    const handleNavigateSlider = () => {
        navigate("/AddNewSlider");
    }

    return (
        <div className="productSlider-departament">
            <div className="header-slider">
                <div className="heading">
                    <img src={iconSlider} alt="imgProduct" onClick={handleNavigate} />
                    <p>Slider</p>
                </div>
                <UserName/>
            </div>
            <div className="addNew-col" onClick={handleNavigateSlider}>
                <AddNew/>
            </div>
            {Slider.length === 0 ? <Loading /> : 
                <div className="col-product">
                <div className="col-image">
                    <img src={Slider.image_path} alt="productimg"/>
                </div>
                    <div className="information-product">
                        <div className="title-content">
                            <p>Title</p>
                        </div>
                        <input onChange={(e) => {
                            setEditTitle(e.target.value)
                        }} type="text" placeholder={Slider.title}/>
                        <div className="description-content">
                            <p>Description</p>
                        </div>
                        <input onChange={(e) => {
                            setEditDescription(e.target.value)
                        }} className="input-Description" type="text" placeholder={Slider.description}/>
                </div>
            </div>
            }
            <div className="Edit-And-Delete">
                <button onClick={handleDelete} className="Delete">Delete</button>
                <button className="Edit" onClick={() => {
                    EditSliderData();
                    handleNavigate();
                }}>Edit</button>
            </div>
        </div>
    )
}
export default ProductSlider;