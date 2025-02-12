import UserName from "./userName"; 
import ContentText from "./ContentText";
import "../css/WhyUs.css";
import "../css/AboutUs.css";
function WhyUS() {
    return (
        <div className="WhyUs-Departament">
            <div className="heading-WhyUs">
                <p className="P-WhyUs">Why US</p>
                <UserName/>
            </div>
            <ContentText title="Why US"/>
        </div>
    )
}
export default WhyUS;