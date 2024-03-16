import React, { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import "../../Assets/css/spinner.css";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateTrip = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('10:00');
    let {id}=useParams();
    const navigate = useNavigate();

    const [Post, setPost] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        salary: "",
        loading: false,
        err: []
    });

    const Do_Post = async (e) => {
      e.preventDefault();
      try {
          const Date = startDate.toISOString().split('T')[0]; // Correct date format
          const Time = value;
    
          setPost({ ...Post, loading: true, err: [] });

          axios.put(`https://mondy-magic-server.onrender.com/updatetrip/${id}`, {
                  name: Post.name,
                  date: Date,
                  time: Time,
                  salary: Post.salary,
                  description: Post.description
              }
              ).then(resp => {
                  console.log(resp);
                  setPost({ ...Post, loading: false, err: [] });
                 navigate("/");

              }).catch((errors) => {
                  console.log(errors);
                  setPost({ ...Post, loading: false, err: [errors.response.data.msg] });
                  console.log([errors.response.data.msg]);
              });
      } catch (error) {
          console.log(error);
      }
    };
    return (
        <div>
            <h1>Update Trip</h1>
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
                            <input type="submit" value=" Update Trip Information" className="btn btn-primary py-2 px-4 text-white" />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateTrip;
