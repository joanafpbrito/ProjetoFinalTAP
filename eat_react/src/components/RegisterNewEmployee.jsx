import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterNewEmployee() {
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
        firstName: data['first-name'],
        lastName: data['last-name'],
        role: data.role,
      }

      const response = fetch("http://localhost:1974/signup",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        }   
      )


      navigate("/", {
        state: {message: "User successfully registered!"}
      });
    }


    return (
      <form onSubmit={handleSubmit}>
        <h2>Welcome on board!</h2>
        <p>This is the best place to work 🚀</p>
        <hr />
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" 
            required/>
          </div>
  
          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
        </div>
  
        <div className="control">
          <label htmlFor="phone">Job Title</label>
          <select id="role" name="role" required>
            <option value="cook">Cook</option>
            <option value="waitress">Waitress</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <hr />

        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              required
            />
            {passwordsAreNotEqual && 
            <div>Passwords must match</div>}
          </div>
        </div>
        <p className="form-actions"><button type="submit" className="button">Register New Employee</button></p>
      </form>
    );
  }

  export default RegisterNewEmployee;