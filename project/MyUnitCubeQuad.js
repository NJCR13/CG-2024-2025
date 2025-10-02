import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js'

/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, texture1,texture2,texture3,texture4,texture5,texture6) {
        
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.textureCima = texture1;
        this.textureFrente = texture2;
        this.textureDireita = texture3;
        this.textureTras = texture4;
        this.textureEsquerda = texture5;
        this.textureBaixo = texture6;
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
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
        
        
        // Trás
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0,1, 0)
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

