import React from "react";
import { Link } from "react-router-dom";


const Home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to Kick of picks</h1>
            <p className="lead">This is a very fun and simple game that can be played in teams and tests your knowledge of football.</p>
            <hr className="my-4" />
            <p>You can create a room and share the code with your friends</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/login" role="button">Log in</Link>
            </p>
        </div>
    </div>
);

export default Home;