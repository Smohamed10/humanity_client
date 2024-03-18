import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [auth, setAuth] = useState(null); // State to hold authentication information
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        status: "user",
        loading: true,
        err: null
    });

    useEffect(() => {
        // Retrieve authentication information when component mounts
        const authInfo = getAuthUser();
        setAuth(authInfo);

        axios.get(`http://localhost:5000/usersget`, {
            headers: {
                token: authInfo[0].token,
            }
        })
        .then((resp) => {
            const users = resp.data;
            const foundUser = users.find(user => parseInt(user.id) === parseInt(id));
            if (foundUser) {
                setUser({
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone,
                    status: foundUser.status,
                    loading: false,
                    err: null
                });
            } else {
                setUser((prevState) => ({ ...prevState, loading: false, err: 'User not found' }));
            }
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
            setUser((prevState) => ({ ...prevState, loading: false, err: 'Error fetching users' }));
        });
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            setUser({ ...user, loading: true, err: [] });

            await axios.put(`http://localhost:5000/usersupdate/${id}`, {
                name: user.name,
                email: user.email,
                phone: user.phone,
                status: user.status
            }, {
                headers: {
                    token: auth[0].token,
                }
            });

            setUser({ ...user, loading: false, err: [] });
            navigate("/manageusers");
        } catch (error) {
            console.error('Error updating user:', error);
            setUser({ ...user, loading: false, err: [error.response.data.msg || 'Error updating user'] });
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            {!user.loading && (
                <form onSubmit={handleUpdateUser} className="p-5 bg-white">
                    <div className="row form-group">
                        <div className="col-md-8 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Username</label>
                            <input required type="text" id="fname" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label className="text-black" htmlFor="status">Status</label>
                            <select value={user.status} onChange={(e) => setUser({ ...user, status: e.target.value })} className="form-control">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Email</label>
                            <input required type="email" id="subject" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="phone">Phone</label>
                            <input required type="tel" id="phone" className="form-control" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
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
