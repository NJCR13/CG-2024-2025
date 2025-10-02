import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, texture){
        super(scene);
        this.sphere = new MySphere(this.scene, 40, 40 , -1);
        this.pan = new CGFappearance(this.scene);
        this.pan.setEmission(1, 1, 1, 1);
        this.pan.setTexture(texture);
        this.pan.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(200,200,200);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.pan.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}