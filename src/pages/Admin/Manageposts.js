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

const Manageposts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedpostId, setSelectedpostId] = useState(null);
  useEffect(() => {
    setposts((prevState) => ({ ...prevState, loading: true }));
    axios.get("http://localhost:5000/getposts",{
      headers:{
          token:Auth[0].token,
      }
    })
      .then((resp) => {
        setposts((prevState) => ({ ...prevState, results: resp.data, loading: false, err: null }));
      })
      .catch(() => {
        setposts((prevState) => ({ ...prevState, loading: false, err: 'Something Went Wrong' }));
      });
  }, [posts.reload]);

  const handleDeletepost = (postId) => {
    setSelectedpostId(postId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmationModal(false);

    if (confirmed) {  
      try {
        await axios.delete(`http://localhost:5000/deletepost/${selectedpostId}`,{
          headers:{
            token:Auth[0].token,
        }
        });
        // Reload posts or update the state as needed
        setposts((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
        navigate('/manageposts');
      } catch (error) {
        // Handle error, if needed
        console.error('An error occurred while deleting the post.', error);
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
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Budget Amount</th>
              <th>All Budget</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            
            {posts.results.map((post, index) => (
    <tr key={post.id}>
      <td>{index + 1}</td>
      <td><img  className='image-avatar' src={post.pic_url} alt={`image`+post.id}></img></td>
      <td>{post.name}</td>
      <td>{post.description}</td>
      <td>{post.amountOfBudget}</td>
      <td>{post.allBudget}</td>

      <td>
        <Link to={`updatepost/${post.id}`} className="header r-flex justify-content-between mb-5">
          <button className='btn btn-sm btn-info'>Update</button>
        </Link>
        <button onClick={() => handleDeletepost(post.id)} className='btn btn-sm btn-danger mx-2'>Delete</button>
      </td>
    </tr>
  ))}

          </tbody>
        </Table>
      </div>
      </div>

      {posts.loading === true && (
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
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
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

export default Manageposts;
