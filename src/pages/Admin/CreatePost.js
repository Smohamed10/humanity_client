import React, { useState, useEffect } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import "../../Assets/css/spinner.css";
import { getAuthUser } from '../../Helper/Storage';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null); // State to hold authentication information

    useEffect(() => {
        // Retrieve authentication information when component mounts
        const authInfo = getAuthUser();
        setAuth(authInfo);
    }, []);

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const [Post, setPost] = useState({
        pic_url: "",
        name: "",
        description: "",
        amountOfBudget: "",
        allBudget: "",
        loading: false,
        err: []
    });

    const Do_Post = async (e) => {
        e.preventDefault();

        setPost({ ...Post, loading: true, err: [] });
        try {
            const imageUrl = await uploadImage(); // Wait for image upload to complete

            if (imageUrl) {
                const response = await axios.post("http://localhost:5000/createpost", {
                    pic_url: imageUrl,
                    name: Post.name,
                    description: Post.description,
                    amountOfBudget: Post.amountOfBudget,
                    allBudget: Post.allBudget,
                }, {
                    headers: {
                        token: auth && auth[0] && auth[0].token, // Access token only if auth exists and has a token
                    },
                });
                console.log(response);
                navigate("/");
            } else {
                console.error("Image upload failed.");
            }
        } catch (error) {
            console.log(error);
            setPost({ ...Post, loading: false, err: [error.response.data.msg || "An error occurred."] });
        }
        setPost({ ...Post, loading: false });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result);
        };
    };

    const handleResetClick = () => {
        setPreview(null);
        setImage(null);
    };

    const uploadImage = async () => {
        if (!image) {
            console.error("No image to upload.");
            return null;
        }
        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "alfarama");
        data.append("cloud_name", "dyeqmtxsd");
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dyeqmtxsd/image/upload`, {
                method: "POST",
                body: data,
            });
            const res = await response.json();
            setLoading(false);
            return res.secure_url;
        } catch (error) {
            setLoading(false);
            console.error(error);
            return null;
        }
    };

    return (
        <div>
            <h1>Create Post</h1>
            {Post.err.map((error, index) => (
                <Alert key={index} variant='danger'>
                    {error}
                </Alert>
            ))}
            <div className="col-md-12 mb-12">
                <form onSubmit={Do_Post} action="#" className="p-5 bg-white">

                    <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Post Name</label>
                            <input required type="text" id="fname" className="form-control" value={Post.name} onChange={(e) => setPost({ ...Post, name: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Amount Of Budget</label>
                            <input required type="number" id="subject" className="form-control" value={Post.amountOfBudget} onChange={(e) => setPost({ ...Post, amountOfBudget: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">All Budget</label>
                            <input required type="number" id="subject" className="form-control" value={Post.allBudget} onChange={(e) => setPost({ ...Post, allBudget: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="Description">Post Description</label>
                            <textarea required value={Post.description} onChange={(e) => setPost({ ...Post, description: e.target.value })} name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write post Details Here..."></textarea>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Upload Post Photo</label>
                            <input required id="subject" type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
                            {preview && <img src={preview} alt="preview" className="img-fluid rounded" />}
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <input disabled={!image} type="submit" value="Post Now" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <button onClick={handleResetClick} className="btn btn-primary py-2 px-4 text-white">Reset Image</button>
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

export default CreatePost;
