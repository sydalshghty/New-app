import UserName from "./userName";
import ContentText from "./ContentText";
import "../css/AboutUs.css";

function AboutUs() {
  return (
      <div className="AboutUs-Deparament">
        <div className="heading-AboutUs">
          <p className="P-AboutUs">About Us</p>
          <UserName/>
      </div>
      <ContentText title="About Us"/>
      </div>
  );
}
export default AboutUs;



