import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import React from 'react';


function App() {
  return (
    <div className="site-wrap">

    <div className="App">
              <div className="site-mobile-menu">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </div>

  );
}

export default App;
