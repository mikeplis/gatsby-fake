const axios = require('axios');
const crypto = require(`crypto`);

exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    return new Promise(resolve => {
        const getPosts = axios.get('https://jsonplaceholder.typicode.com/posts').then(({ data }) => {
            data.forEach(post => {
                const { userId, id, title, body } = post;
                const contentDigest = crypto.createHash('md5').update(JSON.stringify(post)).digest('hex');
                createNode({
                    id: id.toString(),
                    children: [],
                    parent: '__SOURCE__',
                    content: JSON.stringify(body),
                    internal: {
                        contentDigest,
                        type: 'post'
                    },
                    title,
                    body
                });
            });
        });
        const getComments = axios.get('https://jsonplaceholder.typicode.com/comments').then(({ data }) => {
            data.forEach(comment => {
                const { postId, id, name, email, body } = comment;
                const contentDigest = crypto.createHash('md5').update(JSON.stringify(comment)).digest('hex');
                createNode({
                    id: id.toString(),
                    children: [],
                    parent: '__SOURCE__',
                    content: JSON.stringify(body),
                    internal: {
                        contentDigest,
                        type: 'comment'
                    },
                    postId,
                    name,
                    email,
                    body
                });
            });
        });

        return Promise.all([getPosts, getComments]).then(resolve);
    });
};

/**
 * what is a digest? https://stackoverflow.com/questions/3696857/whats-the-difference-between-message-digest-message-authentication-code-and-h
 * https://nodejs.org/api/crypto.html#crypto_class_hash
 */
