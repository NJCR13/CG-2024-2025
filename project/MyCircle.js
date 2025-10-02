import {CGFobject} from '../lib/CGF.js';
/**
* MyCircle
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var angleStep = (2 * Math.PI) / this.slices;
        
       
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);  
        this.texCoords.push(0.5, 0.5);

        
        for(let i = 0; i <= this.slices; i++) {
            var angle = i * angleStep;
            var x = Math.cos(angle);
            var y = Math.sin(angle);
            
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1);  
            this.texCoords.push(
                (x + 1) / 2,  
                (-y + 1) / 2   
            );
        }

        
        for(let i = 1; i <= this.slices; i++) {
            this.indices.push(
                0,        
                i,       
                i + 1     
            );
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


