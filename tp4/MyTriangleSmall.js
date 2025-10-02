import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
    constructor(scene, cor, coords) {
        super(scene);
        this.initBuffers(cor);
        if (coords != undefined)
			this.updateTexCoords(coords);
    }
    
    initBuffers(cor) {
        this.vertices = [
            -1, 0, 0,	//0
            0, 1, 0,	//1
            1, 0, 0	    //2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
           2, 1, 0
        ];

        
        this.normals = [
			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
		];

        // Vermelho
        if(cor == 0) {
            this.texCoords = [
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75
            ]
        }

        // Roxo
        if(cor == 1) {
            this.texCoords = [
                0.25, 0.25,
                0, 0.5,
                0, 0
            ]
        }


        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

