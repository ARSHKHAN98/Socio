import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios"

const Register = () => {

  const [inputs,setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:"",
    website:"",
    city:""
  })

  const [err,setErr]=useState(null);

  const navigate=useNavigate();

  const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  };

  // console.log(inputs)

  const handleClick = async e=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/api/auth/register",inputs);
      navigate("/login")
      setInputs({
        username:"",
        email:"",
        password:"",
        name:"",
      })
    }catch(er)
    {
      // console.log(er.response.data.message);
      setErr(er.response.data.message);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} value={inputs.username}/>
            <input type="email" placeholder="Email"  name="email" onChange={handleChange} value={inputs.email}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}  />
            <input type="text" placeholder="Name"  name="name" onChange={handleChange} value={inputs.name}/>
            <input type="text" placeholder="Website" name="website" onChange={handleChange} value={inputs.website}/>
            <input type="text" placeholder="City" name="city" onChange={handleChange} value={inputs.city}/>
            {/* <input type="text" placeholder="Coverpic" name="username" onChange={handleChange} value={inputs.username}/> */}
            {err&&err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
