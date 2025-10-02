import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            0.5, 0.5, 0.5,       //1
            0.5, -0.5, 0.5,      //2
            -0.5, 0.5, 0.5,      //3 
            -0.5, -0.5, 0.5,     //4
            0.5, 0.5, -0.5,      //5
            0.5, -0.5, -0.5,     //6
            -0.5, 0.5, -0.5,     //7
            -0.5, -0.5, -0.5     //8
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
			0, 2, 3,
            0, 1, 3,
            1, 3, 7,
            5, 7, 1,
            4, 6, 2,
            0, 4, 2,
            5, 7, 6,
            6, 4, 5,
            7, 3, 2,
            6, 7, 2,
            1, 5, 0,
            5, 4, 0,
			3, 2, 0,
            3, 1, 0,
            7, 3, 1,
            1, 7, 5,
            6, 7, 5,
            5, 4, 6,
            2, 6, 4,
            2, 4, 0,
            2, 3, 7,
            2, 7, 6,
            0, 5, 1,
            0, 4, 5

		];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

