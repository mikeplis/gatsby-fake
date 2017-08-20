const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return new Promise(resolve => {
        const createPostPages = graphql(`{
            allPlaceholderPost {
              edges {
                node {
                  id
                }
              }
            }
          }`).then(result => {
            const template = path.resolve('src/templates/post.js');
            const posts = result.data.allPlaceholderPost.edges;

            posts.forEach(({ node: { id } }) => {
                createPage({
                    path: `/posts/${id}`,
                    component: template,
                    context: {
                        id
                    }
                });
            });
        });

        const createUserPages = graphql(`{
            allPlaceholderUser {
              edges {
                node {
                  id
                }
              }
            }
        }`).then(result => {
            const template = path.resolve('src/templates/user.js');
            const users = result.data.allPlaceholderUser.edges;

            users.forEach(({ node: { id } }) => {
                createPage({
                    path: `/users/${id}`,
                    component: template,
                    context: { id }
                });
            });
        });

        const createAlbumPages = graphql(`{
            allPlaceholderAlbum {
              edges {
                node {
                  id
                }
              }
            }
        }`).then(result => {
            const template = path.resolve('src/templates/album.js');
            const albums = result.data.allPlaceholderAlbum.edges;

            albums.forEach(({ node: { id } }) => {
                createPage({
                    path: `/albums/${id}`,
                    component: template,
                    context: { id }
                });
            });
        });

        // XXX: creating photo pages causes build to take too long

        // const createPhotoPages = graphql(`{
        //     allPlaceholderPhoto {
        //         edges {
        //           node {
        //             id
        //           }
        //         }
        //       }
        // }`).then(result => {
        //     const template = path.resolve('src/templates/photo.js');
        //     const photos = result.data.allPlaceholderPhoto.edges;

        //     photos.forEach(({ node: { id } }) => {
        //         createPage({
        //             path: `/photos/${id}`,
        //             component: template,
        //             context: { id }
        //         });
        //     });
        // });

        // Promise.all([createPostPages, createUserPages, createAlbumPages, createPhotoPages]).then(resolve);
        Promise.all([createPostPages, createUserPages, createAlbumPages]).then(resolve);
    });
};
