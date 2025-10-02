import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyWindow extends CGFobject {
    constructor(scene, scaleFactor ,texture){
        super(scene);
        this.plane = new MyPlane(this.scene);
        this.textureW = texture;
        this.scale= scaleFactor;
        this.textureWindow = new CGFappearance(this.scene);
        this.textureWindow.setTexture(this.textureW);
        this.textureWindow.setTextureWrap('REPEAT', 'REPEAT');
        // this.initMaterials();
    }
    // initMaterials() {
    //     this.textureW = new CGFtexture(this.scene, "/project/textures/window4.jpg");
    //     this.textureWindow = new CGFappearance(this.scene);
    //     this.textureWindow.setTexture(this.textureW);
    //     this.textureWindow.setTextureWrap('REPEAT', 'REPEAT');
    // }
    display(){
        this.scene.pushMatrix();
        this.textureWindow.apply();
        // this.scene.rotate(-Math.PI/2, 1,0,0)
        this.scene.scale(this.scale,this.scale,this.scale);
        this.scene.translate(0.5,0.5,0);
        this.plane.display();
        this.scene.popMatrix();
    }
}