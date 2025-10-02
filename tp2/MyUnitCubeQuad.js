import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js'

/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }
    
    display() {
        // Frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        // Esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
        
        
        // Trás
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        
        // Direita
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        
        // Cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        
        // Baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}

