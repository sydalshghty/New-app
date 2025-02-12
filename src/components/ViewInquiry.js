import UserName from "./userName"; 
import "../css/ViewInquiry.css";
import imgCustomLogo from "../images/61GsnUB4HuL 2 (4).png";
function ViewInquiry() {
    return (
        <div className="ViewInquiry-Departament">
            <div className="Inquiry-Heading">
                <p className="P-Inquiry">View Inquiry</p>
                <UserName/>
            </div>
            <div className="ViewInquiry-Content">
                <div className="Col-One">
                    <div>
                        <label>Client Name</label>
                        <input type="text" placeholder="Client Name"/>
                    </div>
                    <div>
                        <label>Client Phone</label>
                        <input type="Number" placeholder="Client Phone"/>
                    </div>
                    <div className="Custom-Color">
                        <label>Custom Color</label>
                        <div className="col-Color">
                            <li></li>
                            <input type="text" placeholder="#FFFFFF"/>
                        </div>
                    </div>
                    <div>
                        <label>Model</label>
                        <input type="text" placeholder="RH Model"/>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="Number" placeholder="1000"/>
                    </div>
                    <div>
                        <label>Size</label>
                        <input type="Number" placeholder="28"/>
                    </div>
                </div>
                <div className="Col-Two">
                    <div>
                        <label>Client Email</label>
                        <input type="text" placeholder="Client Email"/>
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="text" placeholder="date"/>
                    </div>
                    <div className="Custom-Logo">
                        <label>Custom Logo</label>
                        <img src={imgCustomLogo} alt="CustomLogo"/>
                    </div>
                    <div>
                        <label>Raw Material</label>
                        <input type="text" placeholder="ABS"/>
                    </div>
                    <div className="col-Color">
                        <label>Color</label>
                        <div>
                            <li></li>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-Button">
                <button>Show Product Page</button>
                <button>Contact the Client</button>
            </div>
        </div>
    )
}
export default ViewInquiry;