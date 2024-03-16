import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from'axios'
import Alert from 'react-bootstrap/Alert';
import { setAuthUser } from '../../Helper/Storage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

    const [Register, setRegister] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        loading: false,
        err: []
    })
    const Do_Register=(e) =>{
        e.preventDefault();
        setRegister({...Register,loading:true,err:[]})
        axios.post("https://mondy-magic-server.onrender.com/register",{
            email: Register.email,password:Register.password,phone:Register.phone,name:Register.name,
        }).then(resp=>{
            setRegister({...Register,loading:false,err:[]})
            setAuthUser(resp.data);
            navigate("/Login");
        }).catch((errors)=>{
            console.log(errors);
            setRegister({...Register,loading:false,err:[errors.response.data.msg]})
            console.log([errors.response.data.msg])
        });
        console.log(Register.err);
    }
    return (
        <div>
            <h1>Registartion</h1>
            {Register.err.map((error,index)=>(
            <Alert key={index} variant='success'>
            {error}
          </Alert>
    ))}

<div class="container">
<div class="row justify-content-center">
  <div class="col-md-3 my-2 mb-5">
    
  <Form onSubmit={Do_Register}>

<Form.Group className="mb-3" controlId="username">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Username" value={Register.name} onChange={(e)=>setRegister({...Register,name:e.target.value})} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={Register.email} onChange={(e)=>setRegister({...Register,email:e.target.value})} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="phone">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="number" placeholder="Phone Number" value={Register.phone} onChange={(e)=>setRegister({...Register,phone:e.target.value})}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={Register.password} onChange={(e)=>setRegister({...Register,password:e.target.value})} />
  </Form.Group>

  <Button className="ml-1 mr-1" variant="primary" type="submit">
    Register
  </Button>
  <Link to="/Login">
                        <Button variant="warning" type="submit" >
                            Login
                        </Button>
                        </Link>
</Form>
  </div>
</div>
</div>


        </div>
    );
};

export default Register;
