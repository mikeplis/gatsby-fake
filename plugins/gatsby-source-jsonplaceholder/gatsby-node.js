exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    createNode({
        id: 'foo',
        children: [],
        parent: '__SOURCE__',
        internal: {
            contentDigest: 'asdf',
            type: 'myStuff'
        }
    });
};
