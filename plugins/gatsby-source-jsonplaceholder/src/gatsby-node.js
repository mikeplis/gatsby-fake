const axios = require('axios');
const crypto = require('crypto');
const uuidv5 = require('uuid/v5');

const USER = 'user';
const POST = 'post';
const COMMENT = 'comment';
const ALBUM = 'album';
const PHOTO = 'photo';
const TODO = 'todo';

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

exports.sourceNodes = ({ boundActionCreators, getNode }, pluginOptions, cb) => {
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
            internal: {
                contentDigest,
                content: JSON.stringify(body),
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
            internal: {
                contentDigest,
                content: JSON.stringify(body),
                type: 'PlaceholderComment'
            },
            body
        };
        createNode(commentNode);
        createParentChildLink({ parent: postNode, child: commentNode });
    };

    const createAlbumNode = album => {
        const { id, userId, ...rest } = album;
        const contentDigest = getDigest(album);
        const userNode = getNode(getId(userId, USER));
        const albumNode = {
            ...rest,
            id: getId(id, ALBUM),
            children: [],
            parent: getId(userId, USER),
            internal: {
                contentDigest,
                type: 'PlaceholderAlbum'
            }
        };
        createNode(albumNode);
        createParentChildLink({ parent: userNode, child: albumNode });
    };

    const createPhotoNode = photo => {
        const { id, albumId, ...rest } = photo;
        const contentDigest = getDigest(photo);
        const albumNode = getNode(getId(albumId, ALBUM));
        const photoNode = {
            ...rest,
            id: getId(id, PHOTO),
            children: [],
            parent: getId(albumId, ALBUM),
            internal: {
                contentDigest,
                type: 'PlaceholderPhoto'
            }
        };
        createNode(photoNode);
        createParentChildLink({ parent: albumNode, child: photoNode });
    };

    const createTodoNode = todo => {
        const { id, userId, ...rest } = todo;
        const contentDigest = getDigest(todo);
        const userNode = getNode(getId(userId, USER));
        const todoNode = {
            ...rest,
            id: getId(id, TODO),
            children: [],
            parent: getId(userId, USER),
            internal: {
                contentDigest,
                type: 'PlaceholderTodo'
            }
        };
        createNode(todoNode);
        createParentChildLink({ parent: userNode, child: todoNode });
    };

    const getUsers = axios.get('https://jsonplaceholder.typicode.com/users');
    const getPosts = axios.get('https://jsonplaceholder.typicode.com/posts');
    const getComments = axios.get('https://jsonplaceholder.typicode.com/comments');
    const getAlbums = axios.get('https://jsonplaceholder.typicode.com/albums');
    const getPhotos = axios.get('https://jsonplaceholder.typicode.com/photos');
    const getTodos = axios.get('https://jsonplaceholder.typicode.com/todos');
    axios.all([getUsers, getPosts, getComments, getAlbums, getPhotos, getTodos]).then(
        axios.spread(
            (
                { data: users },
                { data: posts },
                { data: comments },
                { data: albums },
                { data: photos },
                { data: todos }
            ) => {
                users.forEach(createUserNode);
                posts.forEach(createPostNode);
                comments.forEach(createCommentNode);
                albums.forEach(createAlbumNode);
                photos.forEach(createPhotoNode);
                todos.forEach(createTodoNode);

                // tell Gatsby we're done
                cb();
            }
        )
    );
};
