import "../css/Context.css";

function ContentText(props) {
    return (
        <div className="Col-AboutUs">
            <div>
                <label>{props.title}</label>
                <input type="text" placeholder={props.title} />
            </div>
            <button className="button-Save">save</button>
        </div>
    )
}
export default ContentText;