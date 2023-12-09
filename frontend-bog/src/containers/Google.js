import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        //console.log('State: ' + state);
        //console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location, googleAuthenticate]);

    return (
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
};

export default connect(null, { googleAuthenticate })(Google);
