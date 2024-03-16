import React, { useState} from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import {useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const SubmitForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        userid: "",
        name: "",
        description: "",
        budget: "",
        type: "",
        loading: false,
        err: []
    });

    const Do_form = async (e) => {
        e.preventDefault();

        setForm({ ...form, loading: true, err: [] });
        try {
                const response = await axios.post(`http://localhost:5000/createform/${Auth[0].id}`, {
                    userid: Auth[0].id,
                    name: form.name,
                    description: form.description,
                    budget:form.budget,
                    type:form.type,
                }, {
                    headers: {
                        token: Auth[0].token,
                    },
                });
                console.log(response);
                navigate("/");

        } catch (error) {
            console.log(error);
            setForm({ ...form, loading: false, err: [error.response.data.msg || "An error occurred."] });
        }
        setForm({ ...form, loading: false });
    };

    return (
        <div>
        <h1>Post Name</h1>
        {form.err.map((error, index) => (
            <Alert key={index} variant='danger'>
                {error}
            </Alert>
        ))}
        <div className="col-md-12 mb-12">
            <form onSubmit={Do_form} action="#" className="p-5 bg-white">

                <div className="row form-group">
                    <div className="col-md-8 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">Name</label>
                        <input required type="text" id="fname" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                            <label className="text-black" htmlFor="status">Type</label>
                            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="form-control">
                                <option value="volunteer">volunteer</option>
                                <option value="poor">poor</option>
                            </select>
                        </div>
                </div>
                

                <div className="row form-group">
                    <div className="col-md-12">
                        <label className="text-black" htmlFor="subject">Budget</label>
                        <input required type="number" id="subject" className="form-control" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-12">
                        <label className="text-black" htmlFor="Description">Description</label>
                        <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write Details Here..."></textarea>
                    </div>
                </div>


                <div className="row form-group">
                    <div className="col-md-12">
                        <input type="submit" value="Submit Now" className="btn btn-primary py-2 px-4 text-white" />
                    </div>
                </div>



                <div className="h-screen sm:px-8 md:px-16 sm:py-8">
                    <div className="container mx-auto max-w-screen-lg h-full">
                        <div className="loading-spinner-container">
                            {loading ? (
                                <div className="loading-spinner-overlay">
                                    <div className="loading-spinner-container">
                                        <div className="loading-spinner">&#9765;</div>
                                        <span>Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* Additional content when not loading */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};
export default SubmitForm;