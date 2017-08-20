import React from 'react';
import Link from 'gatsby-link';

import PostTitle from '../components/PostTitle';

export default ({ data: { placeholderPost } }) => {
    const { title, body, author } = placeholderPost;
    return (
        <div>
            <h1>
                <PostTitle>
                    {title}
                </PostTitle>
            </h1>
            <div>
                By: <Link to={`/users/${author.id}`}>{author.name}</Link>
            </div>
            <p>
                {body}
            </p>
        </div>
    );
};

export const pageQuery = graphql`
    query PostByIdQuery($id: String!) {
        placeholderPost(id: { eq: $id }) {
            id
            title
            body
            author: parent {
                ... on PlaceholderUser {
                    id
                    name
                }
            }
        }
    }
`;
