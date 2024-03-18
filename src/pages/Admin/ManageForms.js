import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const ManageForms = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null); // State to hold authentication information

  useEffect(() => {
    // Retrieve authentication information when component mounts
    const authInfo = getAuthUser();
    setAuth(authInfo);
  }, []);

  const [formss, setformss] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [showRejectConfirmationModal, setShowRejectConfirmationModal] = useState(false);
  const [showAcceptConfirmationModal, setShowAcceptConfirmationModal] = useState(false);
  const [selectedformsId, setSelectedformsId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setformss((prevState) => ({ ...prevState, loading: true }));

    // Only fetch forms if there's a selected option and authentication information is available
    if (selectedOption && auth) {
      let url = "";

      switch (selectedOption) {
        case "poor":
          url = "http://localhost:5000/getpoorforms";
          break;
        case "accepted":
          url = "http://localhost:5000/acceprtedformsget";
          break;
        case "volunteer":
          url = "http://localhost:5000/getvolunteerforms";
          break;
        default:
          url = "http://localhost:5000/formssget";
      }

      axios.get(url, {
        headers: {
          token: auth[0].token,
        }
      })
        .then((resp) => {
          setformss((prevState) => ({ ...prevState, results: resp.data, loading: false, err: null }));
        })
        .catch(() => {
          setformss((prevState) => ({ ...prevState, loading: false, results: [], err: 'No forms found for the selected option' } ));
        });
    } else {
      // Clear forms if no option is selected or authentication information is not available
      setformss((prevState) => ({ ...prevState, results: [], loading: false, err: null }));
    }
  }, [formss.reload, selectedOption, auth]);

  const handleDeleteforms = (formsId) => {
    setSelectedformsId(formsId);
    setShowRejectConfirmationModal(true);
  };

  const handleAcceptForms = (formsId) => {
    setSelectedformsId(formsId);
    setShowAcceptConfirmationModal(true);
  };

  const handleConfirmationReject = async (confirmed) => {
    setShowRejectConfirmationModal(false);

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/rejectform/${selectedformsId}`, {
        },
              {
                  headers:
                  {
                      token: auth[0].token
                  }
              });
        setformss((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
        navigate('/manageforms');
      } catch (error) {
        console.error('An error occurred while rejecting the form.', error);
      }
    }
  };

  const handleConfirmationAccept = async (confirmed) => {
    setShowAcceptConfirmationModal(false);

    if (confirmed) {
      try {
        axios.post(`http://localhost:5000/acceptform/${selectedformsId}`, {
      },
            {
                headers:
                {
                    token: auth[0].token
                }
            }
        );
        setformss((prevState) => ({ ...prevState, reload: prevState.reload + 1 }));
        navigate('/manageforms');
      } catch (error) {
        console.error('An error occurred while accepting the form.', error);
      }
    }
  };

  return (
    <div className="site-section" data-aos="fade-up">
      <div className="container">

        <div>
          <label htmlFor="selectOption">Select Option: </label>
          <select id="selectOption" onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Select Type</option>
            <option value="poor">Poor</option>
            <option value="accepted">Accepted</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {formss.loading && <div>Loading...</div>}
        {formss.err && <div>{formss.err}</div>}

        {formss.results.length > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>UserID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Budget</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formss.results.map((forms, index) => (
                  <tr key={forms.id}>
                    <td>{index + 1}</td>
                    <td>{forms.id}</td>
                    <td>{forms.userid}</td>
                    <td>{forms.name}</td>
                    <td>{forms.description}</td>
                    <td>{forms.budget}</td>
                    <td>{forms.type}</td>
                    <td>{forms.status}</td>
                    <td>
                      {forms.status !== 'accepted' && (
                        <>
                          <button onClick={() => handleAcceptForms(forms.id)} className='btn btn-sm btn-info mx-2'>Accept</button>
                          <button onClick={() => handleDeleteforms(forms.id)} className='btn btn-sm btn-danger mx-2'>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

      </div>

      {/* Reject Confirmation Modal */}
      <Modal show={showRejectConfirmationModal} onHide={() => setShowRejectConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Reject this form?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectConfirmationModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleConfirmationReject(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Accept Confirmation Modal */}
      <Modal show={showAcceptConfirmationModal} onHide={() => setShowAcceptConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Approve this form?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAcceptConfirmationModal(false)}>
            No
          </Button>
          <Button variant="info" onClick={() => handleConfirmationAccept(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageForms;
