const axios = require('axios');
const crypto = require(`crypto`);
const uuidv5 = require('uuid/v5');

const USER = 'user';
const POST = 'post';
const COMMENT = 'comment';

// namespace uuid so that we can generate consistent uuids - do not change this
const UUID_NAMESPACE = '544e07b9-3f8c-4ebf-9013-344e9ddbac54';

/**
 * Get a uuid based on the id from jsonplaceholder and some namespace (typically the type name)
 *
 * Since we don't control the id's returned from jsonplaceholder, we need some way to create a consistent uuid
 * for every object returned from the api
 */
const getId = (id, namespace) => uuidv5(`${namespace}_${id}`, UUID_NAMESPACE);

const getDigest = obj => crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');

exports.sourceNodes = ({ boundActionCreators, getNode }, pluginOptions) => {
    const { createNode, createParentChildLink } = boundActionCreators;

    const createUserNode = user => {
        const { id, ...rest } = user;
        const contentDigest = getDigest(user);
        const userNode = {
            ...rest,
            id: getId(id, USER),
            children: [],
            parent: '__SOURCE__',
            internal: {
                contentDigest,
                type: 'PlaceholderUser'
            }
        };
        createNode(userNode);
    };

    const createPostNode = post => {
        const { id, userId, body, ...rest } = post;
        const contentDigest = getDigest(post);
        const userNode = getNode(getId(userId, USER));
        const postNode = {
            ...rest,
            id: getId(id, POST),
            children: [],
            parent: getId(userId, USER),
            content: JSON.stringify(body),
            internal: {
                contentDigest,
                type: 'PlaceholderPost'
            },
            body
        };
        createNode(postNode);
        createParentChildLink({ parent: userNode, child: postNode });
    };

    const createCommentNode = comment => {
        const { id, postId, body, ...rest } = comment;
        const contentDigest = getDigest(comment);
        const postNode = getNode(getId(postId, POST));
        const commentNode = {
            ...rest,
            id: getId(id, COMMENT),
            children: [],
            parent: getId(postId, POST),
            content: JSON.stringify(body),
            internal: {
                contentDigest,
                type: 'PlaceholderComment'
            },
            body
        };
        createNode(commentNode);
        createParentChildLink({ parent: postNode, child: commentNode });
    };

    const getUsers = axios.get('https://jsonplaceholder.typicode.com/users');
    const getPosts = axios.get('https://jsonplaceholder.typicode.com/posts');
    const getComments = axios.get('https://jsonplaceholder.typicode.com/comments');
    axios.all([getUsers, getPosts, getComments]).then(
        axios.spread(({ data: users }, { data: posts }, { data: comments }) => {
            console.log('got data');
            users.forEach(createUserNode);
            posts.forEach(createPostNode);
            comments.forEach(createCommentNode);
        })
    );
};

/**
 * what is a digest? https://stackoverflow.com/questions/3696857/whats-the-difference-between-message-digest-message-authentication-code-and-h
 * https://nodejs.org/api/crypto.html#crypto_class_hash
 *
 * 'id' field in createNode must be globally unique, or else your objects will get overwritten
 *
 * second argument to sourceNodes is pluginOptions, which are the options passed in via gatsby-config.js
 */
