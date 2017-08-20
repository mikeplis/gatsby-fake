import React from 'react';
import Link from 'gatsby-link';

import PostTitle from '../components/PostTitle';

export default ({ data: { placeholderUser: { id, name, username, email, childrenPlaceholderPost: posts } } }) => {
    return (
        <div>
            <h1>
                {name}
            </h1>
            <div>
                Username: {username}
            </div>
            <div>
                Email: {email}
            </div>
            <ul>
                {posts.map(({ id: postId, title }) =>
                    <li key={postId}>
                        <Link to={`/posts/${postId}`}>
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

export const pageQuery = graphql`
    query UserByIdQuery($id: String!) {
        placeholderUser(id: { eq: $id }) {
            id
            name
            username
            email
            childrenPlaceholderPost {
                id
                title
            }
        }
    }
`;
