import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
    }
    
    display(){

      //Laranja
    
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(1,0.5,0.1,255);
        this.triangleBig.display();
        this.scene.popMatrix();
      
  
      //Azul
      
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(8),0);
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(0,0,1,255);
        this.triangleBig.display();
        this.scene.popMatrix();
      
  
      //Verde
      
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2/2+Math.sqrt(8)/2,Math.SQRT2/4+Math.sqrt(8)/2+Math.sqrt(8),0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(0,1,0,255);
        this.diamond.display();
        this.scene.popMatrix();
      
  
      //Rosa
      
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(8)/2,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setDiffuse(1,0.6,0.81,255);
        this.triangle.display();
        this.scene.popMatrix();
      
  
      //Amarelo
      
        this.scene.pushMatrix();
        this.scene.setDiffuse(1, 1, 0);
        this.scene.translate(Math.sqrt(8)/2, -Math.sqrt(8), 0);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
      
  
      //Vermelho
      
        this.scene.pushMatrix();
        this.scene.translate(0.5,-Math.sqrt(8)-0.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(1,0,0,255);
        this.triangleSmall.display();
        this.scene.popMatrix();
      
  
      //Roxo
      
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2/2+Math.sqrt(8)/2,-Math.sqrt(8)-0.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(0.6,0.125,0.6,255);
        this.triangleSmall.display();
        this.scene.popMatrix();
      
    }
}

