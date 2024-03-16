import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link ,useParams} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const DetailsComponent = (props) => {
    const formattedDate = new Date(props.date).toISOString().split('T')[0];
    const [showModal, setShowModal] = React.useState(false);
    let {id}=useParams();

    const handleBookNowClick = () => {
      setShowModal(true);
    };
  
    const handleConfirmBooking = () => {
      // Perform the booking logic here
      // For example, redirect the user to the booking page
      // or call a function to handle the booking process
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className="site-section" data-aos="fade-up">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-5 mb-md-5">
              <img src={props.master_image} text="First slide" alt="img" className="img-fluid rounded" />
              <Carousel>
      <Carousel.Item interval={1000}>
      <img src={props.master_image} text="First slide" alt="img" className="img-fluid rounded" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img src={props.master_image} text="First slide" alt="img" className="img-fluid rounded" />        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={props.master_image} text="First slide" alt="img" className="img-fluid rounded" />        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            </div>
            <div className="col-md-6 pl-md-5">
              <h1 className="font-weight-light text-black mb-4">{props.name}</h1>
  
              <h2 className="font-weight-light text-black mb-4">
                <span className="mr-3">&#128184; {props.salary}$</span>
                <span className="mr-3">
                  <i className="fa fa-calendar mr-2" style={{ fontSize: '36px', color: 'blue' }}></i>{formattedDate}
                </span>
                <span>&#128337; {props.time}</span>
              </h2>
  
              <h5 className="font-weight-light text-black mb-4">{props.description}</h5>
  
              <p>
                <button className='btn btn-xxl btn-warning' onClick={handleBookNowClick}>
                  Book Now !
                </button>
              </p>
            </div>
          </div>
        </div>
  
        {/* Custom Confirmation Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to book this trip?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Link to={`book/${id}`}>
            <Button variant="primary" onClick={handleConfirmBooking}>
              Confirm
            </Button>
                    </Link>
  
          </Modal.Footer>
        </Modal>
      </div>
    );
};

export default DetailsComponent;