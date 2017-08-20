import React from 'react';
import Link from 'gatsby-link';

const UsersPage = ({ data }) => {
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {data.allPlaceholderUser.edges.map(({ node: { id, name } }) =>
                    <li key={id}>
                        <Link to={`/users/${id}`}>
                            {name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default UsersPage;

export const pageQuery = graphql`
    query UsersQuery {
        allPlaceholderUser {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;
