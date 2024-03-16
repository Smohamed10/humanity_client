import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getAuthUser } from '../../Helper/Storage';

const Auth = getAuthUser();

const UserHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState({
        loading: true,
        data: [],
        err: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/userhistory/${id}`, {
                    headers: {
                        token: Auth[0].token,
                    }
                });
                setHistory({ loading: false, data: response.data, err: null });
            } catch (error) {
                setHistory({ loading: false, data: [], err: 'History not found' });
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="site-section" data-aos="fade-up">
            <div className="container">
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
                            </tr>
                        </thead>
                        <tbody>
                            {history.data.map((historyItem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{historyItem.id}</td>
                                    <td>{historyItem.userid}</td>
                                    <td>{historyItem.name}</td>
                                    <td>{historyItem.description}</td>
                                    <td>{historyItem.budget}</td>
                                    <td>{historyItem.type}</td>
                                    <td>{historyItem.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </div>
        
    );
};

export default UserHistory;
