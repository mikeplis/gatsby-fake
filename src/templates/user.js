import React from 'react';
import Link from 'gatsby-link';

export default ({ data: { placeholderUser: { id, name, username, email, posts, albums, todos } } }) => {
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
            <h2>Posts</h2>
            <ul>
                {posts.map(({ id: postId, title }) =>
                    <li key={postId}>
                        <Link to={`/posts/${postId}`}>
                            {title}
                        </Link>
                    </li>
                )}
            </ul>
            <h2>Albums</h2>
            <ul>
                {albums.map(({ id: albumId, title }) =>
                    <li key={albumId}>
                        <Link to={`/albums/${albumId}`}>
                            {title}
                        </Link>
                    </li>
                )}
            </ul>
            <h2>Todos</h2>
            <ul>
                {todos.map(({ id: todoId, title, completed }) =>
                    <li key={todoId}>
                        {title} {completed ? '\u2610' : '\u2611'}
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
            posts: childrenPlaceholderPost {
                id
                title
            }
            albums: childrenPlaceholderAlbum {
                id
                title
            }
            todos: childrenPlaceholderTodo {
                id
                title
                completed
            }
        }
    }
`;
