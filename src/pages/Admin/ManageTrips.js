import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../Assets/css/spinner.css";
import "../../css/avatar.css";
import { useNavigate } from "react-router-dom";

import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const ManageTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    setTrips((prevState) => ({ ...prevState, loading: true }));
    axios.get("https://mondy-magic-server.onrender.com/gettrip",{
      params: {
        category: "All" // Pass selected option as query parameter
      }
    })
      .then((resp) => {
        setTrips((prevState) => ({ ...prevState, results: resp.data, loading: false, err: null }));
      })
      .catch(() => {
        setTrips((prevState) => ({ ...prevState, loading: false, err: 'Something Went Wrong' }));
      });
  }, [trips.reload]);

  const handleDeleteTrip = (tripId) => {
    setSelectedTripId(tripId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmationModal(false);

    if (confirmed) {  
      try {
        await axios.delete(`https://mondy-magic-server.onrender.com/deletetrip/${selectedTripId}`);
        // Reload trips or update the state as needed
        setTrips((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
        navigate('/');
      } catch (error) {
        // Handle error, if needed
        console.error('An error occurred while deleting the trip.', error);
      }
    }
  };

  return (
    <div className="site-section" data-aos="fade-up">
      <div className="container">
        <Link to="/post" className="header r-flex justify-content-between mb-5">
          <button className='btn btn-sm btn-success'>Add Trip</button>
        </Link>
        <div className="table-responsive">
          <Table striped bordered hover className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>image</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {trips.results.map((trip, index) => (
    <tr key={trip.id}>
      <td>{index + 1}</td>
      <td>
        {trip.master_image && trip.master_image.length > 0 && (
          <img src={trip.master_image.split(',')[0]} className='image-avatar' alt={trip.name} />
        )}
      </td>
      <td>{trip.name}</td>
      <td>{new Date(trip.date).toISOString().split('T')[0]}</td>
      <td>{trip.time}</td>
      <td>{trip.salary}</td>
      <td>
        <Link to={`update/${trip.id}`} className="header r-flex justify-content-between mb-5">
          <button className='btn btn-sm btn-info'>Update</button>
        </Link>
        <button onClick={() => handleDeleteTrip(trip.id)} className='btn btn-sm btn-danger mx-2'>Delete</button>
      </td>
    </tr>
  ))}

          </tbody>
        </Table>
      </div>
      </div>

      {trips.loading === true && (
    <div className="loading-spinner-overlay">
    <div className="loading-spinner-container">
        <div className="loading-spinner">&#9765;</div>
        <span>Loading...</span>
    </div>
</div>
        )}
      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => handleConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this trip?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleConfirmation(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleConfirmation(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTrips;
