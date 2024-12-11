import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();

        navigate ("/");
    }, [navigate]);
    return(
        <div>
            Logging Out...
        </div>
    )
}

export default Logout;