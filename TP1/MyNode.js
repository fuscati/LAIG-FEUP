/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 **/

function MyNode(nodeID) {

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // primitives
    this.leaves = [];

    // The material ID.
    this.materialID = null;

    // The texture ID.
    this.textureID = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

