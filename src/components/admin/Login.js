import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <Link to="/dashboard/home">
                <h3>
                    Go To Dashboard
                </h3>
            </Link>
        </div>
    )
}