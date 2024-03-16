import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Assets/css/spinner.css';
import { Container, Row, Col } from 'react-bootstrap'; 
import Posts from '../../components/Posts';

const Home = () => {  

  const [posts, setposts] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [filteredposts, setFilteredposts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");

  useEffect(() => {
    setposts(prevState => ({ ...prevState, loading: true }));
    axios.get("http://localhost:5000/getposts", {
      params: { category: selectedOption }
    })
    .then(resp => {
      setposts(prevState => ({ ...prevState, results: resp.data, loading: false, err: null }));
    })
    .catch(() => {
      setposts(prevState => ({ ...prevState, loading: false, results: [], err: null }));
    });

  }, [posts.reload, selectedOption]);

  useEffect(() => {
    const filteredResults = posts.results.filter(post => post.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredposts(filteredResults);
  }, [search, posts.results]);

  return (
    <div className="site-wrap">
      <div className="site-section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={7} className="text-center">
              <h2 className="font-weight-light mb-5 text-black">Find  Post</h2>
              <Form>
                <Form.Group className="mb-3 d-flex" controlId="search">
                  <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type a Keyword (:" />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {posts.loading ? (
            <div className="loading-spinner-overlay">
              <div className="loading-spinner-container">
                <div className="loading-spinner">&#9765;</div>
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {filteredposts.length > 0 ? (
                filteredposts.map((post) => (
                  <Row key={post.id}>
                    <Posts
                      id={post.id}
                      name={post.name}
                      description={post.description}
                      pic_url={post.pic_url}
                      amountOfBudget={post.amountOfBudget}
                      allBudget={post.allBudget}
                />
                  </Row>
                ))
              ) : (
                <Alert variant='danger'>
                  No posts Available, Try Again Later
                </Alert>
              )}
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
