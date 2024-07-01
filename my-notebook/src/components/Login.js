import React, {useState} from 'react'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({username:"", password:""});
    let history = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"            
            },
            body: JSON.stringify({username: credentials.username, password: credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            // Saving auth token
            localStorage.setItem('token', json.authToken)
            // Redirects to home page
            history("/")
          }else{
            alert("Invalid creds");
          }
    }

    const onChange= (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
            <label htmlFor="exampleInputUsername">Username</label>
            <input type="text" className="form-control" id="username" value={credentials.username} onChange={onChange} name="username" aria-describedby="usernameHelp" placeholder="Enter Username"/>
            <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
        </div>
        <div className="form-group my-4">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Enter Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
