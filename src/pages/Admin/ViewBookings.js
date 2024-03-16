import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../Assets/css/spinner.css";
import "../../css/avatar.css";
import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const ViewBookings = () => {
    const [bookings, setBookings] = useState({
        loading: true,
        results: [],
        err: null,
        reload: "0"
      });
      const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    setBookings((prevState) => ({ ...prevState, loading: true }));
    axios.get("https://mondy-magic-server.onrender.com/getusersbooking")
      .then((resp) => {
        setBookings((prevState) => ({ ...prevState, results: resp.data, loading: false, err: null }));
      })
      .catch(() => {
        setBookings((prevState) => ({ ...prevState, loading: false, err: 'Something Went Wrong' }));
      });
  }, [bookings.reload]);

  const handleDeleteTrip = (tripId) => {
    setSelectedTripId(tripId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmationModal(false);

    if (confirmed) {  
      try {
        await axios.delete(`https://mondy-magic-server.onrender.com/deletebookingT/${selectedTripId}`);
        // Reload trips or update the state as needed
        setBookings((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
      } catch (error) {
        // Handle error, if needed
        console.error('An error occurred while deleting the trip.', error);
      }
    }
  };

  return (
    <div className="site-section" data-aos="fade-up">
      <div className="container">
        <div className="table-responsive">
          <Table striped bordered hover className='table'>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Destination</th>
              <th>Phone</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.results.map((book, index) => (
              <tr key={book.id}>
                <td>{book.user_name}</td>
                <td>{book.trip_name}</td>
                <td>{book.phone}</td>
                <td>{book.time}</td>
                <td>{book.date}</td>
                <td>
                  <button onClick={() => handleDeleteTrip(book.id)} className='btn btn-sm btn-danger mx-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div>

      {bookings.loading === true && (
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
        <Modal.Body>Are you sure you want to delete this Booking?</Modal.Body>
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

export default ViewBookings;