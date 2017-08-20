import React from 'react';
import Link from 'gatsby-link';

export default ({ data: { placeholderPost: { title, body, author, comments } } }) => {
    return (
        <div>
            <h1>
                {title}
            </h1>
            <div>
                By: <Link to={`/users/${author.id}`}>{author.name}</Link>
            </div>
            <p>
                {body}
            </p>
            <h2>Comments</h2>
            <ul>
                {comments.map(({ id, email, body: commentBody }) =>
                    <li key={id}>
                        <h3>
                            {email}
                        </h3>
                        <p>
                            {commentBody}
                        </p>
                    </li>
                )}
            </ul>
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
            comments: childrenPlaceholderComment {
                id
                email
                body
            }
        }
    }
`;
