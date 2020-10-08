/**
* MyTriangle
* @constructor
* @param  {CGFscene} scene - MyScene object
* @param {X-coordinate of the first vertices} x1
* @param {Y-coordinate of the first vertices} y1
* @param {Z-coordinate of the first vertices} z1
* @param {X-coordinate of the second vertices} x2
* @param {Y-coordinate of the second vertices} y2
* @param {Z-coordinate of the second vertices} z2
* @param {X-coordinate of the third vertices} x3
* @param {Y-coordinate of the third vertices} y3
* @param {Z-coordinate of the third vertices} z3
*/

class MyTriangle extends CGFobject {
    constructor(scene,x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        super(scene);

        

        // Initialize Vertices as 3D vectors
        this.v1 = vec3.fromValues(x1, y1, z1);
        this.v2 = vec3.fromValues(x2, y2, z2);
        this.v3 = vec3.fromValues(x3, y3, z3);

        this.initBuffers();
    }

    /**
     *                 . v3(c * cos(alpha) / lenght_u, c * sin(alpha) / lenght_v)
     *                / \
     *               /   \
     *              /     \
     *             /       \
     *            /         \
     *         c /           \ b
     *          /             \
     *         /               \
     *        /                 \
     *       /                   \
     *      /_____________________\
     *      v1(0, 0)   a           v2(1, 0) => (a / lenght_u)
     */

    initBuffers() {
        // vertices
        this.vertices = [
            this.v1[0], this.v1[1], this.v1[2],
            this.v2[0], this.v2[1], this.v2[2],
            this.v3[0], this.v3[1], this.v3[2]
        ];

        // indices
        this.indices = [0, 1, 2];

        // a-side vector
        let v12 = [ this.v2[0] - this.v1[0],
                    this.v2[1] - this.v1[1],
                    this.v2[2] - this.v1[2]];

        // c-side vector
        let v13 = [ this.v3[0] - this.v1[0],
                    this.v3[1] - this.v1[1],
                    this.v3[2] - this.v1[2]];

        // normals
        let normal = vec3.create();
        vec3.cross(normal, v12, v13);
        vec3.normalize(normal, normal);

        this.normals = [
            normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2]
        ]

        // Calc distances
        this.distA = Math.sqrt(Math.pow(v12[0], 2) + Math.pow(v12[1], 2) + Math.pow(v12[2], 2));
        this.distB = Math.sqrt(Math.pow(this.v3[0] - this.v2[0], 2) + Math.pow(this.v3[1] - this.v2[1], 2) + Math.pow(this.v3[2] - this.v2[2], 2));
        this.distC = Math.sqrt(Math.pow(v13[0], 2) + Math.pow(v13[1], 2) + Math.pow(v13[2], 2));

        // Calc Alpha angle (between a and c) sin and cos
        this.cosAlpha = (this.distA * this.distA - this.distB * this.distB + this.distC * this.distC) / (2 * this.distA * this.distB * this.distC);
        this.sinAlpha = Math.sqrt(1 - this.cosAlpha * this.cosAlpha);

        // Texture Coordinates
        this.textCoords = [
            0, 1,
            1, 1,
            this.distC * this.cosAlpha, this.distC * this.sinAlpha
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method updateTextCoords
     * Updates the list of texture coordinates of the triangle
     * @param {Lenght of the texture along the 1-2 side (a)} lenghtS
     * @param {Lenght of the texture along the height of the triangle} lenghtT
     */
    updateTextCoords(lenghtS, lenghtT) {
        this.textCoords = [
            0, 0,
            this.distA / lenghtS, 0,
            (this.dist * this.cosAlpha) / lenghtS, (this.distC * this.sinAlpha) / lenghtT
        ];

        this.updateTextCoordsGLBuffers();
    }
}