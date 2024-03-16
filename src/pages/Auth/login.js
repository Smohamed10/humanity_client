import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { setAuthUser} from '../../Helper/Storage';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        loading: false,
        err: []
    });

    const navigate = useNavigate();

    const doLogin = (e) => {
        e.preventDefault();
        setLoginData({ ...loginData, loading: true, err: [] });
        axios.post("http://localhost:5000/login", {
            email: loginData.email,
            password: loginData.password,
        }).then(resp => {
            setLoginData({ ...loginData, loading: false, err: [] });
            setAuthUser (resp.data);           
            navigate(`/`); 
        }).catch((errors) => {
            console.log(errors);
            setLoginData({ ...loginData, loading: false, err: [errors.response.data.msg] });
            console.log([errors.response.data.msg]);
        });
        console.log(loginData.err);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-3 my-5 mb-5">
                    <h1>Login</h1>
                    {loginData.err.map((error, index) => (
                        <Alert key={index} variant='danger'>
                            {error}
                        </Alert>
                    ))}
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" required placeholder="Enter email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        </Form.Group>
                        <Button className="ml-1 mr-1" variant="primary" type="submit" onClick={doLogin}>
                            Login
                        </Button>
                        <Link to="/register">
                        <Button variant="warning" type="submit" >
                            register
                        </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
