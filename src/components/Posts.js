import React, { useState } from 'react';
import { Modal, Button, Alert, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuthUser } from '../Helper/Storage';

import axios from 'axios';
var Auth = getAuthUser();
const carouselHeight = window.innerWidth < 768 ? "200px" : "400px";


const Posts = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success

  const handleBookNowClick = () => {
     Auth = getAuthUser();
    if(Auth&&Auth[0].status==='user')
    {
      setShowModal(true);
    }
    else if (Auth&&Auth[0].status==='admin')
    {
      navigate("/");
    }
    else if (!Auth)
    {
      navigate("/Login");

    }
  };

  const handleConfirmBooking = () => {
    axios.post("https://mondy-magic-server.onrender.com/booking/"+Auth[0].id,{
      trip_id:props.id,

    })
      .then((resp) => {
        setShowModal(false);
        setBookingSuccess(true); // Set booking success to true
        setTimeout(() => setBookingSuccess(false), 5000); // Reset booking success after 5 seconds
      })
      .catch(() => {
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    
    <div className="site-section" data-aos="fade-up">
      <div className="container">
      {/*bookingSuccess && (
          <Alert variant="success" onClose={() => setBookingSuccess(false)} dismissible>
            Booking Done Successfully, We Will Contact You Soon :)
          </Alert>
        )}
      */}

        <div className="row align-items-center">
          <div className="col-md-6 mb-5 mb-md-5">
          <div style={{ maxHeight: carouselHeight, overflow: "hidden" }}>
          <img src={props.pic_url} className="d-block w-100" style={{ objectFit: "cover", maxHeight: "100%", width: "100%" }}alt={`Slide`}/>
    </div>
          </div>
          <div className="col-md-6 pl-md-5">
            <h1 className="font-weight-light text-black mb-4">{props.name}</h1>

            <h2 className="font-weight-light text-black mb-4">
              <span className="mr-3">&#128184; {props.amountOfBudget} &nbsp; Amount Budget</span>
            </h2>
            <h2 className="font-weight-light text-black mb-4">

            <span className="mr-3">&#128184; {props.allBudget} &nbsp;All Budget</span>
            </h2>

            <h5 className="font-weight-light text-black mb-4">{props.description}</h5>
{/*
            <p>
              <button className='btn btn-xxl btn-warning' onClick={handleBookNowClick}>
                Book Now !
              </button>
            </p>
      */}
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to book this trip?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>

          <Button  variant="primary" onClick={handleConfirmBooking}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
       */}
    </div>
  );
};

export default Posts;
