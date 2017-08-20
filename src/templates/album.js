import React from 'react';
import Link from 'gatsby-link';

export default ({ data: { placeholderAlbum: { id, title, photos, user } } }) => {
    return (
        <div>
            <h1>
                {title}
            </h1>
            <h2>
                <Link to={`/users/${user.id}`}>
                    {user.name}
                </Link>
            </h2>
            {photos.map(({ id: photoId, thumbnailUrl }) =>
                <img key={photoId} style={{ padding: 10 }} alt="" src={thumbnailUrl} />
            )}
        </div>
    );
};

export const pageQuery = graphql`
    query AlbumByIdQuery($id: String!) {
        placeholderAlbum(id: { eq: $id }) {
            id
            title
            photos: childrenPlaceholderPhoto {
                id
                thumbnailUrl
            }
            user: parent {
                ... on PlaceholderUser {
                    id
                    name
                }
            }
        }
    }
`;
