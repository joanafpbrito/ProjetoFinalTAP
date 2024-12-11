import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const navigate = useNavigate();

    function handleSubmit(event){
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries())

      if(data.password != data.confirmPassword){
        setPasswordsAreNotEqual(true);
        return;
      }

      const user = {
        email: data.email,
        password: data.password,
        name: data.name,
        role: "client",
        termsAccepted: data.terms === 'on',
      }

      const response = fetch("http://localhost:1974/signup",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        }   
      )

      .then ((response) => {
        if(response.ok) {
          console.log("Response is ok:", response.ok);
          return response.json();
        } else {
          console.error("Response is not OK:", response.status, response.statusText);
          throw new Error("Failed to authenticate");
        }
      })

      .then ((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate("/landing-page", {
        state: {message: "User successfully registered!"}
      });
      })

      
    }


    return (
      <form onSubmit={handleSubmit}>
        <h2>Welcome to Eat React!</h2>
        <p>Sign up to see all the digital menus we have 🚀</p>
  
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
  
        <div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password" type="password" name="confirmPassword" required />
            {passwordsAreNotEqual && <div>Passwords must match</div>}
          </div>
        </div>
        <hr />
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required/>
          </div>
        </div>
        <div>
          <label htmlFor="terms-and-conditions">
            <input required type="checkbox" id="terms-and-conditions" name="terms" />
            I agree to the terms and conditions
          </label>
        </div>
  
        <p><button type="submit">Sign up</button></p>
      </form>
    );
  }