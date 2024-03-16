import React from 'react'; 
import bus from "../../Images/bus.jpg"
import mom from "../../Images/mom.jpg"
import pop from "../../Images/pop.jpg"
import popp from "../../Images/popp.jpg"


const About = () => {
    return (
        <div>
    <div className="site-section" data-aos="fade-up">


      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-5 mb-md-5">
            <img src={bus} alt="img" className="img-fluid rounded"/>
          </div>
          <div className="col-md-6 pl-md-5">
            <h2 className="font-weight-light text-black mb-4">What is our Business ?</h2>
            <p>Welcome to our mondy magic tourism company! We are dedicated to providing unforgettable travel experiences and creating lifelong memories for our valued customers. With a passion for exploration and a commitment to exceptional service, we strive to be your trusted partner in all your travel adventures.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-5 mb-md-5">
            <img src={mom} alt="img" className="img-fluid rounded"/>
          </div>
          <div className="col-md-6 pl-md-5">
            <h2 className="font-weight-light text-black mb-4">About Us</h2>
            <p>We carefully select accommodations, tour operators, and transportation partners that share our values of sustainability and responsible tourism. By choosing us, you can be confident that your travels are contributing to the preservation of our planet and the well-being of local communities.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-5 mb-md-5">
            <img src={pop} alt="img" className="img-fluid rounded"/>
          </div>
          <div className="col-md-6 pl-md-5">
            <h2 className="font-weight-light text-black mb-4">Experiential Travel</h2>
            <p>Our new strategy focuses on curating unique and immersive experiences that go beyond the surface. Whether it's learning traditional cooking techniques from local chefs, participating in conservation projects, or engaging in cultural exchanges, we will design itineraries that allow you to create meaningful connections and lasting memories.</p>
          </div>
        </div>
      </div>


      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-5 mb-md-5">
            <img src={popp} alt="img" className="img-fluid rounded"/>
          </div>
          <div className="col-md-6 pl-md-5">
            <h2 className="font-weight-light text-black mb-4">Community Engagement</h2>
            <p>We recognize the importance of engaging with local communities and empowering them through tourism. Our new strategy emphasizes collaboration with local stakeholders to ensure that our activities benefit the communities we visit..</p>
          </div>
        </div>
      </div>

    </div>
        </div>

    );
};

export default About;