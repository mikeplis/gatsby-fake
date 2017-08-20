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

            posts.forEach(({ node }) => {
                const { id } = node;
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

        Promise.all([createPostPages, createUserPages]).then(resolve);
    });
};
