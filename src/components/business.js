import UserName from "./userName"; 
import "../css/BusinessHours.css";
import ContentText from "./ContentText";
function BusinessHours() {
    return (
        <div className="BusinessHours-Departament">
            <div className="heading-Business">
                <p className="P-Business">Business Hours</p>
                <UserName/>
            </div>
            <ContentText title="Business Hours"/>
        </div>
    )
}
export default BusinessHours;