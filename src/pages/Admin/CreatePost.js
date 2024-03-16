import React, { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";
import "../../Assets/css/spinner.css";
import { getAuthUser } from '../../Helper/Storage';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown component

const Auth = getAuthUser();

const CreatePost = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('10:00');
    const [preview, setPreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All"); // State for the selected dropdown option
    const navigate = useNavigate();

    const [Post, setPost] = useState({
        master_image: [],
        name: "",
        description: "",
        date: "",
        time: "",
        salary: "",
        public_id: [],
        loading: false,
        err: []
    });

    const Do_Post = async (e) => {
        e.preventDefault();

        try {
            const { imageUrls, publicIds } = await uploadImages(); // Wait for image upload to complete

            if (imageUrls.length > 0) {
                const Date = startDate.toISOString().split('T')[0]; // Correct date format
                const Time = value;

                setPost({ ...Post, loading: true, err: [] });
                console.log(imageUrls.join(','))
                axios.post("https://mondy-magic-server.onrender.com/createtrip", {
                    master_image: imageUrls.join(','),
                    name: Post.name,
                    date: Date,
                    time: Time,
                    salary: Post.salary,
                    description: Post.description,
                    public_id: publicIds.join(','),
                    category: selectedCategory // Include selected category in Axios request
                },
                ).then(resp => {
                    console.log(resp);
                    navigate("/");
                    setPost({ ...Post, loading: false, err: [] });

                }).catch((errors) => {
                    console.log(errors);
                    setPost({ ...Post, loading: false, err: [errors.response.data.msg] });
                    console.log([errors.response.data.msg]);
                });
            } else {
                console.error("Image upload failed or master_image is empty.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        setImages(files);

        const imagesPreview = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                imagesPreview.push(reader.result);
                if (imagesPreview.length === files.length) {
                    setPreview(imagesPreview);
                }
            };
        }
    };

    const handleResetClick = () => {
        setPreview(null);
        setImages([]);
    };

    const uploadImages = async () => {
        if (images.length === 0) {
            console.error("No images to upload.");
            return { imageUrls: [], publicIds: [] };
        }

        setLoading(true);
        const imageUrls = [];
        const publicIds = [];

        for (let i = 0; i < images.length; i++) {
            const data = new FormData();
            data.append("file", images[i]);
            data.append("upload_preset", "Mondy_Magic");
            data.append("cloud_name", "dfdjpb4g9");

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dfdjpb4g9/image/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );
                const res = await response.json();
                imageUrls.push(res.secure_url);
                publicIds.push(res.public_id);
            } catch (error) {
                console.error(error);
            }
        }

        setLoading(false);
        return { imageUrls, publicIds };
    };

    return (
        <div>
            <h1>New Post</h1>
            {Post.err.map((error, index) => (
                <Alert key={index} variant='danger'>
                    {error}
                </Alert>
            ))}
            <div className="col-md-12 mb-12">
                <form onSubmit={Do_Post} action="#" className="p-5 bg-white">

                    <div className="row form-group">
                        <div className="col-md-8 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Trip Destination</label>
                            <input required type="text" id="fname" className="form-control" value={Post.name} onChange={(e) => setPost({ ...Post, name: e.target.value })} />
                        </div>

                        <div className="col-md-2 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="fname">Pick The Date</label>
                            <DatePicker required selected={startDate} id="fname" className="form-control" onChange={(date) => setStartDate(date)} />
                            <input type="hidden" name="date" value={startDate.toISOString().split('T')[0]} />
                        </div>

                        <div className="col-md-2 mb-3 mb-md-0">
                            <label className="text-black" htmlFor="lname">Pick The Time</label>
                            <TimePicker required id="lname" className="form-control" onChange={onChange} value={value} />
                            <input type="hidden" name="time" value={value} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="category">Category</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {selectedCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSelectedCategory("All")}>All</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("Full Day")}>Full Day</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("Half Day")}>Half Day</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("Night tours")}>Night tours</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("Packages")}>Packages</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("Special Offers")}>Special Offers</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedCategory("VIP")}>VIP</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Price</label>
                            <input required type="number" id="subject" className="form-control" value={Post.salary} onChange={(e) => setPost({ ...Post, salary: e.target.value })} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="Description">Trip Details</label>
                            <textarea required value={Post.description} onChange={(e) => setPost({ ...Post, description: e.target.value })} name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Write Trip Details Here..."></textarea>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <label className="text-black" htmlFor="subject">Upload Destination Photo</label>
                            <input required id="subject" type="file" className="form-control" onChange={handleImageChange} accept="image/*" multiple />
                            {preview && preview.map((image, index) => (
                                <img key={index} src={image} alt={`preview-${index}`} className="img-fluid rounded" />
                            ))}
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-md-12">
                            <input disabled={images.length === 0} type="submit" value="Post Now" className="btn btn-primary py-2 px-4 text-white" />
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
