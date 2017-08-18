exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    createNode({ id: 'foo' });
}