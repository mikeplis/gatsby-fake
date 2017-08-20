import React from 'react';
import Link from 'gatsby-link';

import PostTitle from '../components/PostTitle';

const PostsPage = ({ data }) => {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.allPlaceholderPost.edges.map(({ node: { id, title } }) =>
                    <li key={id}>
                        <Link to={`/posts/${id}`}>
                            <PostTitle>
                                {title}
                            </PostTitle>
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
