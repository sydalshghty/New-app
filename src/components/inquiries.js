import UserName from "./userName";
import "../css/inquiries.css";
import SearchInput from "./searchInput";
import imgInquiry from "../images/61GsnUB4HuL 3 (1).png";
import { useNavigate } from "react-router-dom";
function Inquiries() {
    const navigate = useNavigate("");

    const handleNavigate = () => {
        navigate("/ViewInquiry")
    }
    return (
        <div className="inquiries-Departament">
            <div className="heading-inquiries">
                <p className="p-inquiries">Inquiries</p>
                <UserName/>
            </div>
            <div className="col-Search">
                <SearchInput/>
            </div>
            <div className="AllInquiries-P">
                <p>All Inquiries</p>
            </div>
            <div className="AllInquiries-Cols" style={{cursor: "pointer"}} onClick={handleNavigate}>
                <div className="Col-Inquiriey">
                    <p className="P-Id">1</p>
                    <div className="inquiry-Content">
                        <div className="information-Inquiry">
                            <p>Person Name</p>
                            <p>||</p>
                            <p>Person@gmail.com</p>
                            <p>||</p>
                            <p>01001010101</p>
                        </div>
                        <p className="P-RH-Model">1000 - RH Model</p>
                        <div className="Material-Colors">
                            <p>Raw Material - 28</p>
                            <li></li>
                        </div>
                    </div>
                    <img src={imgInquiry} alt="img-Inquiry"/>
                </div>
            </div>
        </div>
    )
}
export default Inquiries;