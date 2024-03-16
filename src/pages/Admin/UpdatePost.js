import React, { useState, useEffect } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useParams, useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const UpdatePost = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    console.log(id)
    const [Post, setPost] = useState({
        name: "",
        phone: "",
        email: "",
        status: "post",
        loading: true,
        err: null
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/getposts`, {
            headers: {
                token: Auth[0].token,
            }
        })
        .then((resp) => {
            const posts = resp.data;
            console.log(posts)
            const post = posts.find(post => parseInt(post.id) === parseInt(id));
            console.log(post)
            if (post) {
                setPost({
                    name: post.name,
                    description: post.description,
                    pic_url: post.pic_url,
                    amountOfBudget: post.amountOfBudget,
                    allBudget: post.allBudget,
                    loading: false,
                    err: null
                });
            } else {
                setPost((prevState) => ({ ...prevState, loading: false, err: 'post not found' }));
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
            setPost({ ...Post, loading: true, err: [] });

            await axios.put(`http://localhost:5000/updatepost/${id}`, {
                name: Post.name,
                description: Post.description,
                pic_url: Post.pic_url,
                amountOfBudget: Post.amountOfBudget,
                allBudget: Post.allBudget,
            }, {
                headers: {
                    token: Auth[0].token,
                }
            });

            setPost({ ...Post, loading: false, err: [] });
            navigate("/manageposts");
        } catch (error) {
            console.error('Error updating post:', error);
            setPost({ ...Post, loading: false, err: [error.response.data.msg || 'Error updating post'] });
        }
    };

    return (
        <div>
            <h1>Update post</h1>
            {!Post.loading && (
                <form onSubmit={handleUpdatePost} className="p-5 bg-white">
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
                            <input type="submit" value="Update Post Information" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>
                    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
                        <div className="container mx-auto max-w-screen-lg h-full">
                            <div className="loading-spinner-container">
                                {Post.loading ? (
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
