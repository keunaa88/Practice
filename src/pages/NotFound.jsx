import Button from "components/Button";
import { useNavigate } from "react-router-dom";






function NotFound() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    }

    return (
        <div className="content" style={{textAlign : "center"}}>
            <h1>404</h1>
            <h2>NOT FOUND</h2>
            <p></p>
            <h4>Sorry, the page you are looking for doesn't exist</h4>
            <h4>If you think something is broken, report a problem</h4>
            <p></p>
            <Button text="Back to Home" onClick={goToHomePage}></Button>
        </div>
    )
}


export default NotFound;