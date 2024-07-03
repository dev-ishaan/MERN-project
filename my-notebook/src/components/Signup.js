import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
      const [credentials, setCredentials] = useState({name:"", username:"", password:"", cpassword:""});
        let history = useNavigate();
        const handleSubmit = async (e) =>{
            e.preventDefault()
            const {name, username, password, cpassword} = credentials
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"            
                },
                body: JSON.stringify({name, username, password})
              });
              const json = await response.json();
              console.log(json)
              if(json.success && password === cpassword){
                // Saving auth token
                localStorage.setItem('token', json.authToken)
                props.showAlert("Account Created Successfully", "success")
                // Redirects to home page
                history("/")
              }else{
                props.showAlert("Fill the form correctly", "danger")
              }
        }

        const onChange= (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }
  return (
    <div className='container'>
      <h3 className='text-center my-4'>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="usernameHelp" placeholder="Enter Name"/>
        </div> <div className="form-group my-4">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" onChange={onChange} aria-describedby="usernameHelp" placeholder="Enter Username"/>
            <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
        </div>
        <div className="form-group my-4">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Enter Password" minLength={5} required/>
        </div>
        <div className="form-group my-4">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
