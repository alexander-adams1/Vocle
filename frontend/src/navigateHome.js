import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";

// Used to link the Vocle header back to home
const GoHome = () => {
    const navigate = useNavigate();

    const navigatetoHome = () => {
        navigate('/')
    }
    return (
        <div className="header"><div className="header_div"><div className="header_background"> </div>

            <span className="vocle_label" onClick={navigatetoHome}>Vocle</span><div className="information"></div><div className="stats"></div><div className="spotify"></div></div><div className="login"><div className="login_icon"></div></div></div>

    )

};

export default GoHome;