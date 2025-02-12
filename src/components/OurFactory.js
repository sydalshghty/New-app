import UserName from "./userName";
import ContentText from "./ContentText";
import "../css/factory.CSS";
function OurFactory() {
    return (
        <div className="Factory-Departament">
            <div className="heading-Factory" style={{width: "100%", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px", borderBottom: "0.5px solid var(--border-color)"}}>
                <p className="P-Factory" style={{fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "capitalize",
                    color: "#1F384C"}}>Our Factory</p>
                <UserName/>
            </div>
            <ContentText title="Our Factory"/>
        </div>
    )
}
export default OurFactory;