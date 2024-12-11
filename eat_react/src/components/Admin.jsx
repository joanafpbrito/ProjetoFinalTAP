import { useState } from "react";
import Button from "./Button";
import RegisterNewDish from "./RegisterNewDish";
import RegisterNewEmployee from "./RegisterNewEmployee";

function Admin () {
    const [selection, setSelection] = useState();

    function showContent (option) {
      setSelection(option);
    }

    return (
        <div>
            
            <Button selected={() => showContent("employee")} isActive={selection == "employee"}> Register New Employee </Button>
                
            <Button selected={() => showContent("dish")} isActive={selection == "dish"}> Register New Dish </Button>
            
            { (selection == "employee" ) && (
                <div>
                    <RegisterNewEmployee/>
                </div> 
            )}

            { (selection == "dish" ) && (
                <div>
                    <RegisterNewDish/>
                </div> 
            )}

        </div>
    )
}

export default Admin;

