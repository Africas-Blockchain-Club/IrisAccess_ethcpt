import React from 'react';
import { useHistory } from 'react-router-dom';

const Connector = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Welcome to the Iris Scanner App</h1>
            <button onClick={() => history.push('/register')}>Register</button>
            <button onClick={() => history.push('/scanner')}>Iris Scanner</button>
        </div>
    );
};

export default Connector;
