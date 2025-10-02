import { CGFobject } from '../lib/CGF.js';


export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let alphaAng = (2 * Math.PI) / this.slices; // Angle per slice
        let stackHeight = 1 / this.stacks; // Height per stack

        // ** Generate vertices and normals **
        for (let stack = 0; stack <= this.stacks; stack++) {
            let z = stack * stackHeight; // Current height level

            for (let i = 0; i < this.slices; i++) {
                let ang = i * alphaAng;
                let x = Math.cos(ang);
                let y = Math.sin(ang);

                // Push vertex position
                this.vertices.push(x, y, z);

                // The normal is just (x, y, 0) to be perpendicular to the surface
                this.normals.push(x, y, 0);
            }
        }

        // ** Generate indices for the side faces **
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let i = 0; i < this.slices; i++) {
                let nextI = (i + 1) % this.slices;

                let current = stack * this.slices + i;
                let next = stack * this.slices + nextI;
                let above = (stack + 1) * this.slices + i;
                let aboveNext = (stack + 1) * this.slices + nextI;

                // Create two triangles per quad
                this.indices.push(next, above, current);
                this.indices.push(aboveNext, above, next);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}