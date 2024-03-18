import React, { useState, useEffect } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const UpdatePost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [auth, setAuth] = useState(null); // State to hold authentication information
    const [post, setPost] = useState({
        name: "",
        description: "",
        pic_url: "",
        amountOfBudget: "",
        allBudget:"",
        loading: true,
        err: null
    });

    useEffect(() => {
        // Retrieve authentication information when component mounts
        const authInfo = getAuthUser();
        setAuth(authInfo);

        axios.get(`http://localhost:5000/getposts`, {
            headers: {
                token: authInfo[0].token,
            }
        })
        .then((resp) => {
            const posts = resp.data;
            const foundPost = posts.find(post => parseInt(post.id) === parseInt(id));
            if (foundPost) {
                setPost({
                    name: foundPost.name,
                    description: foundPost.description,
                    pic_url: foundPost.pic_url,
                    amountOfBudget: foundPost.amountOfBudget,
                    allBudget: foundPost.allBudget,
                    loading: false,
                    err: null
                });
            } else {
                setPost((prevState) => ({ ...prevState, loading: false, err: 'Post not found' }));
            }
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
            setPost((prevState) => ({ ...prevState, loading: false, err: 'Error fetching posts' }));
        });
    }, [id]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        try {
            setPost({ ...post, loading: true, err: [] });

            await axios.put(`http://localhost:5000/updatepost/${id}`, {
                name: post.name,
                description: post.description,
                pic_url: post.pic_url,
                amountOfBudget: post.amountOfBudget,
                allBudget: post.allBudget,
            }, {
                headers: {
                    token: auth[0].token,
                }
            });

            setPost({ ...post, loading: false, err: [] });
            navigate("/manageposts");
        } catch (error) {
            console.error('Error updating post:', error);
            setPost({ ...post, loading: false, err: [error.response.data.msg || 'Error updating post'] });
        }
    };

    return (
        <div>
            <h1>Update Post</h1>
            {!post.loading && (
                <form onSubmit={handleUpdatePost} className="p-5 bg-white">
                    <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Post Name</label>
                            <input required type="text" id="fname" className="form-control" value={post.name} onChange={(e) => setPost({ ...post, name: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Amount Of Budget</label>
                            <input required type="number" id="subject" className="form-control" value={post.amountOfBudget} onChange={(e) => setPost({ ...post, amountOfBudget: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">All Budget</label>
                            <input required type="number" id="subject" className="form-control" value={post.allBudget} onChange={(e) => setPost({ ...post, allBudget: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="Description">Post Description</label>
                            <textarea required value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write post Details Here..."></textarea>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <input type="submit" value="Update Post Information" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>
                    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
                        <div className="container mx-auto max-w-screen-lg h-full">
                            <div className="loading-spinner-container">
                                {post.loading ? (
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
            )}
        </div>
    );
};

export default UpdatePost;
