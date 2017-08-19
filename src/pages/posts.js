import React from 'react';
import Link from 'gatsby-link';

const PostsPage = props => {
    console.log(props);
    return (
        <div>
            <h1>Hi people</h1>
            <p>Welcome to page 2</p>
            <Link to="/">Go back to the homepage</Link>
        </div>
    );
};

export default PostsPage;

export const pageQuery = graphql`
    query PostsQuery {
        allPlaceholderPost {
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
`;
