import React from 'react';
import Link from 'gatsby-link';

export default ({ data: { allPlaceholderAlbum: { albums } } }) => {
    return (
        <div>
            <h1>Albums</h1>
            <ul>
                {albums.map(({ album: { id, title, user } }) =>
                    <li key={id}>
                        <Link to={`/albums/${id}`}>
                            {title} (<small>{user.name}</small>)
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export const pageQuery = graphql`
    query AlbumsQuery {
        allPlaceholderAlbum {
            albums: edges {
                album: node {
                    id
                    title
                    user: parent {
                        ... on PlaceholderUser {
                            name
                        }
                    }
                }
            }
        }
    }
`;
