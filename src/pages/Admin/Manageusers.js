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

const Manageusers = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null); // State to hold authentication information
  const [Users, setUsers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Retrieve authentication information when component mounts
    const authInfo = getAuthUser();
    setAuth(authInfo);
  }, []);

  useEffect(() => {
    // Fetch user data only if auth information is available
    if (auth) {
      setUsers((prevState) => ({ ...prevState, loading: true }));
      axios.get("http://localhost:5000/usersget", {
        headers: {
          token: auth[0].token,
        }
      })
        .then((resp) => {
          setUsers((prevState) => ({ ...prevState, results: resp.data, loading: false, err: null }));
        })
        .catch(() => {
          setUsers((prevState) => ({ ...prevState, loading: false, err: 'Something Went Wrong' }));
        });
    }
  }, [auth]);

  const handleDeleteUser = (UserId) => {
    setSelectedUserId(UserId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmationModal(false);

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/userdelete/${selectedUserId}`, {
          headers: {
            token: auth[0].token,
          }
        });
        // Reload Users or update the state as needed
        setUsers((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
        navigate('/manageusers');
      } catch (error) {
        // Handle error, if needed
        console.error('An error occurred while deleting the User.', error);
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
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {Users.results.map((User, index) => (
                <tr key={User.id}>
                  <td>{index + 1}</td>
                  <td> <Link to={`showhistory/${User.id}`}>
                    {User.name}
                  </Link></td>
                  <td>{User.email}</td>
                  <td>{User.phone}</td>
                  <td>
                    <Link to={`updateuser/${User.id}`} className="header r-flex justify-content-between mb-5">
                      <button className='btn btn-sm btn-info'>Update</button>
                    </Link>
                    <button onClick={() => handleDeleteUser(User.id)} className='btn btn-sm btn-danger mx-2'>Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </div>
      </div>

      {Users.loading === true && (
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
        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
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

export default Manageusers;
