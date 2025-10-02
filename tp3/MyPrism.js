import { CGFobject } from '../lib/CGF.js';

export class MyPrism extends CGFobject {
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

        let alphaAng = (2 * Math.PI) / this.slices;

        for (let stack = 0; stack < this.stacks; stack++) {
            let zBottom = stack / this.stacks;       // Bottom z-coordinate of stack
            let zTop = (stack + 1) / this.stacks;   // Top z-coordinate of stack

            for (let i = 0; i < this.slices; i++) {
                let ang = i * alphaAng;
                let nextAng = (i + 1) * alphaAng;

                // Compute coordinates
                let x1 = Math.cos(ang);
                let y1 = Math.sin(ang);
                let x2 = Math.cos(nextAng);
                let y2 = Math.sin(nextAng);

                // Push vertices (bottom and top)
                this.vertices.push(x1, y1, zBottom); // Bottom-left
                this.vertices.push(x2, y2, zBottom); // Bottom-right
                this.vertices.push(x1, y1, zTop);    // Top-left
                this.vertices.push(x2, y2, zTop);    // Top-right

                // Compute normal for this face (perpendicular to face)
                let normal = [
                    Math.cos(ang + alphaAng / 2),
                    Math.sin(ang + alphaAng / 2),
                    0
                ];

                // Normalize the normal
                let nSize = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
                normal = normal.map(n => n / nSize);

                // Assign normals to each vertex of the face
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                // Push two triangles to form the rectangular face
                let baseIdx = (stack * this.slices + i) * 4;
                this.indices.push(baseIdx, baseIdx + 1, baseIdx + 2);
                this.indices.push(baseIdx + 1, baseIdx + 3, baseIdx + 2);
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
