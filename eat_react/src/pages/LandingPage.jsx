import { useLocation } from "react-router-dom";
import Admin from "../components/admin";
import Client from "../components/client";
import Cook from "../components/cook";
import { Dishes } from "../components/Dishes";

function LandingPage () {
    const location = useLocation();
    const role = localStorage.getItem('role');
    console.log(role);
    // se há token de login, vieram ter a esta pagina. o conteudo aparece mediante o role, ou seja 
        // if role == client aparece o componente cliente, se admin aparece o componente admin etc
        // agora o mais importante, como vou buscar o login? e o token?

    function handleRole () {
        switch (role) {
            case "admin":
                return <Admin/>;
            case "cook":
                return <Cook/>;
            case "client":
                return <Client/>;
        }
    }

    return (
        <div>  
        ola landing page
        {handleRole()}
        
        </div>
        )

}

export default LandingPage;