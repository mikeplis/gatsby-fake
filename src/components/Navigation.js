import React from 'react';
import Link from 'gatsby-link';

export default () => {
    return (
        <ul className="navigation">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/users">Users</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/albums">Albums</Link>
            </li>
        </ul>
    );
};
