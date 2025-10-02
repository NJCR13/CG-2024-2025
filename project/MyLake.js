import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';

export class MyLake extends CGFobject {
    constructor(scene) {
      super(scene);
      this.circle = new MyCircle(this.scene, 50);

      this.initMaterials();
    }

    initMaterials() {
        this.lakeTexture = new CGFtexture(this.scene, "textures/lake.jpg");
        this.lakeText = new CGFappearance(this.scene);
        this.lakeText.setTexture(this.lakeTexture);
        this.lakeText.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-50,0,35);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0,0.1,0);
        this.lakeText.apply();

        this.scene.pushMatrix();
        this.scene.scale(2,1,4);
        this.scene.scale(7, 1, 7);
        this.scene.translate(0,0.01,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.lakeText.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-12,0,0);
        this.scene.scale(2,1,3);
        this.scene.scale(4, 1, 4);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.lakeText.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5,0,-14);
        this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.scale(2,1,3);
        this.scene.scale(3, 1, 3);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.lakeText.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(7,0,18);
        this.scene.scale(2,1,6);
        this.scene.scale(3, 1, 3);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.lakeText.apply();
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-7,0,18);
        this.scene.scale(2,1,6);
        this.scene.scale(3, 1, 3);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.lakeText.apply();
        this.circle.display();
        this.scene.popMatrix();




        this.scene.popMatrix();
    }
  }