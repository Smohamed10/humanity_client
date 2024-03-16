import React from 'react';

const Contact = () => {
    return (
        <div>
            <div className="site-section bg-light">
      <div className="container">
        <div className="row">

          <div className="col-md-12 mb-5">
            
            <div className="p-4 mb-3 bg-white">
              <p className="mb-0 font-weight-bold">Address</p>
              <p className="mb-4">Mit Rahina Musuem</p>

              <p className="mb-0 font-weight-bold">Phone</p>
              <p className="mb-4"><a href="https://wa.me/01009445487">+20 100 944 5487</a></p>
              
              <p className="mb-0 font-weight-bold">Email Address</p>
              <p className="mb-0"><a href=" ">ramadanmandy485@gmail.com</a></p>
    

            </div>
            
            <div className="p-4 mb-3 bg-white">
    <div className="mapouter mb-60">
        <div className="gmap_canvas">
            <iframe
                title="Google Maps"
                width="100%"
                height="520"
                id="gmap_canvas"
                src="https://maps-api-ssl.google.com/maps?hl=en-US&ll=29.849585,31.254306&output=embed&q=Mit+Rahinah,+Badrshein,+Giza+Governorate+3364932,+Egypt+(Mit+Rahina+Museum)&z=16"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
            ></iframe>
        </div>
    </div>
</div>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Contact;