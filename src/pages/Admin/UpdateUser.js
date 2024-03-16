import React, { useState, useEffect } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const UpdateUser = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [Post, setPost] = useState({
        name: "",
        phone: "",
        email: "",
        status: "user",
        loading: true,
        err: null
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/usersget`, {
            headers: {
                token: Auth[0].token,
            }
        })
        .then((resp) => {
            const users = resp.data;
            const user = users.find(user => parseInt(user.id) === parseInt(id));
            if (user) {
                setPost({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    status: user.status,
                    loading: false,
                    err: null
                });
            } else {
                setPost((prevState) => ({ ...prevState, loading: false, err: 'User not found' }));
            }
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
            setPost((prevState) => ({ ...prevState, loading: false, err: 'Error fetching users' }));
        });
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            setPost({ ...Post, loading: true, err: [] });

            await axios.put(`http://localhost:5000/usersupdate/${id}`, {
                name: Post.name,
                email: Post.email,
                phone: Post.phone,
                status: Post.status
            }, {
                headers: {
                    token: Auth[0].token,
                }
            });

            setPost({ ...Post, loading: false, err: [] });
            navigate("/manageusers");
        } catch (error) {
            console.error('Error updating user:', error);
            setPost({ ...Post, loading: false, err: [error.response.data.msg || 'Error updating user'] });
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            {!Post.loading && (
                <form onSubmit={handleUpdateUser} className="p-5 bg-white">
                    <div className="row form-group">
                        <div className="col-md-8 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Username</label>
                            <input required type="text" id="fname" className="form-control" value={Post.name} onChange={(e) => setPost({ ...Post, name: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label className="text-black" htmlFor="status">Status</label>
                            <select value={Post.status} onChange={(e) => setPost({ ...Post, status: e.target.value })} className="form-control">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Email</label>
                            <input required type="email" id="subject" className="form-control" value={Post.email} onChange={(e) => setPost({ ...Post, email: e.target.value })} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="phone">Phone</label>
                            <input required type="tel" id="phone" className="form-control" value={Post.phone} onChange={(e) => setPost({ ...Post, phone: e.target.value })} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <input type="submit" value="Update User Information" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateUser;
