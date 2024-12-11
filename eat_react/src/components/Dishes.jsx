import { useState, useEffect } from "react";

export function Dishes(){
    const[availableDishes, setAvailableDishes] = useState([]);

    useEffect(() =>
        {
          fetch('http://localhost:1974/dishes')
          .then((response) => { return response.json()})
          .then((resData) => {console.log(resData.dishes), setAvailableDishes(resData.dishes)});
        },
        []);

        return (
            <>
            {availableDishes.length > 0 && (
            availableDishes.map((d) => (
                <div>
                    <li key = {d.name}>
                    <h2>{d.name}</h2>
                    <h3>{d.type}</h3>
                    </li>
                </div>
            ) )
            )}
            </>
        )

}