
import ScaleLoader from "react-spinners/ScaleLoader";
import "../css/loading.css";

function Loading() { 
    return (
        <div className="loading">
            <ScaleLoader className="scaleLoader" color="#5A67BA" height={40} width={6} radius={4} />
        </div>
    );
  
};


export default Loading;