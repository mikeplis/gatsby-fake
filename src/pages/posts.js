import React from 'react';
import Link from 'gatsby-link';

const PostsPage = ({ data }) => {
    console.log(data);
    return (
        <div>
            <h1>Posts</h1>
            {data.allPlaceholderPost.edges.map(({ node }) =>
                <div key={node.id}>
                    {node.title}
                </div>
            )}
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
