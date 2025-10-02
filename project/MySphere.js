import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inside) {
		super(scene);
		this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
		this.initBuffers();
	}
    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let startAngle = -Math.PI /2;

        let angleSlices = Math.PI/ this.stacks;    
        let angleStacks = (2*Math.PI)/ this.slices;
        for (let s = 0; s<= this.stacks; s++){
            let v = s/this.slices;
            let phi = startAngle + s * angleSlices;

            for (let sl = 0; sl<= this.slices; sl++){
                let theta = sl * angleStacks;
                this.vertices.push((Math.cos(phi)*Math.cos(theta)), (Math.cos(phi)*Math.sin(theta)), Math.sin(phi));
                this.normals.push((Math.cos(phi)*Math.cos(theta))*this.inside, (Math.cos(phi)*Math.sin(theta))*this.inside, Math.sin(phi)*this.inside);
                this.texCoords.push(1-(sl/this.slices), v);

            }

            
        }
        for (let s = 0; s< this.stacks; s++){
            for (let sl = 0; sl< this.slices; sl++){
                if(this.inside == 1){
                    this.indices.push((s*(this.slices + 1)+ sl), ((s*(this.slices + 1)+ sl)+ this.slices + 1)+1,((s*(this.slices + 1)+ sl)+ this.slices + 1));
                    this.indices.push((s*(this.slices + 1)+ sl), (s*(this.slices + 1)+ sl)+1, ((s*(this.slices + 1)+ sl)+ this.slices + 1)+1);
                }else if(this.inside == -1){
                    this.indices.push(((s*(this.slices + 1)+ sl)+ this.slices + 1), ((s*(this.slices + 1)+ sl)+ this.slices + 1)+1,(s*(this.slices + 1)+ sl));
                    this.indices.push(((s*(this.slices + 1)+ sl)+ this.slices + 1)+1, (s*(this.slices + 1)+ sl)+1, (s*(this.slices + 1)+ sl));
                }
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}
