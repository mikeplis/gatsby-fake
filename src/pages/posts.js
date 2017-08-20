import React from 'react';
import Link from 'gatsby-link';

const PostsPage = ({ data }) => {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.allPlaceholderPost.edges.map(({ node: { id, title } }) =>
                    <li key={id}>
                        <Link to={`/posts/${id}`}>
                            {title}
                        </Link>
                    </li>
                )}
            </ul>
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
