import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterNewDish() {
  const [dish, setDish] = useState([]);
  const navigate = useNavigate();

    function handleSubmit(event){
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries())

      const dishes = {
        name: data.name,
        image: data.image,
        type: data.type
      }

      const response = fetch("http://localhost:1974/dishes",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(dishes)
        }   
      )

      .then(() => {
        setDish("");
        window.location.reload();
      }
      )
    }


    return (
        <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome on board!</h2>
        <p>Register new dish 🚀</p>
        <hr />
        <div>
          <div>
            <label htmlFor="name">Dish Name</label>
            <input type="text" id="name" name="name" required/>
          </div>
          <div>
            <label htmlFor="image">Upload dish image:</label>
            <input type="file" id="image" name="image" accept="image/*" required/>
          </div> 
        </div>
  
        <div>
          <label htmlFor="phone">Type</label>
          <select id="type" name="type" required>
            <option value="starter">Starters</option>
            <option value="main-course">Main Course</option>
            <option value="dessert">Desserts</option>
            <option value="snack">Snacks</option>
            <option value="drink">Drinks</option>
          </select>
        </div>
        <p><button type="submit" className="button">Register New Dish</button></p>
      </form>
      {dish && <p>{dish}</p>}
      </>
    );
  }

  export default RegisterNewDish;