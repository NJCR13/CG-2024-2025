import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.initMaterials();
    }

    initMaterials(){
      //Laranja - TriangleBig
      this.matlaranja = new CGFappearance(this.scene);
      this.matlaranja.setAmbient(0, 0, 0, 1.0);
      this.matlaranja.setDiffuse(1,0.5,0.1,1);
      this.matlaranja.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matlaranja.setShininess(10.0);

      //Azul - TriangleBig
      this.matazul = new CGFappearance(this.scene);
      this.matazul.setAmbient(0, 0, 0, 1.0);
      this.matazul.setDiffuse(0,0,1,1);
      this.matazul.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matazul.setShininess(10.0);
      
      //Verde - Diamond
      this.matverde = new CGFappearance(this.scene);
      this.matverde.setAmbient(0, 0, 0, 1.0);
      this.matverde.setDiffuse(0,1,0,1);
      this.matverde.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matverde.setShininess(10.0);

      //Rosa - Triangle
      this.matrosa = new CGFappearance(this.scene);
      this.matrosa.setAmbient(0, 0, 0, 1.0);
      this.matrosa.setDiffuse(1,0.6,0.81,1);
      this.matrosa.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matrosa.setShininess(10.0);

      //Amarelo - Parallelogram
      this.matamarelo = new CGFappearance(this.scene);
      this.matamarelo.setAmbient(0, 0, 0, 1.0);
      this.matamarelo.setDiffuse(1, 1, 0, 1);
      this.matamarelo.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matamarelo.setShininess(10.0);

      //Vermelho - TriangleSmall
      this.matvermelho = new CGFappearance(this.scene);
      this.matvermelho.setAmbient(0, 0, 0, 1.0);
      this.matvermelho.setDiffuse(1,0,0,1);
      this.matvermelho.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matvermelho.setShininess(10.0);

      //Roxo - TriangleSmall
      this.matroxo = new CGFappearance(this.scene);
      this.matroxo.setAmbient(0, 0, 0, 1.0);
      this.matroxo.setDiffuse(0.6,0.125,0.6,1);
      this.matroxo.setSpecular(0.8, 0.8, 0.8, 1.0);
      this.matroxo.setShininess(10.0);
    }

    display(){
      //Laranja
    
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,0,1);
        this.matlaranja.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
      
  
      //Azul
      
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(8),0);
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.matazul.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
      
  
      //Verde
      
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2/2+Math.sqrt(8)/2,Math.SQRT2/4+Math.sqrt(8)/2+Math.sqrt(8),0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
      
  
      //Rosa
      
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(8)/2,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.matrosa.apply();
        this.triangle.display();
        this.scene.popMatrix();
      
  
      
        //Amarelo
      
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(8)/2, -Math.sqrt(8), 0);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.matamarelo.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
      
  
      //Vermelho
      
        this.scene.pushMatrix();
        this.scene.translate(0.5,-Math.sqrt(8)-0.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.matvermelho.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
      
  
      //Roxo
      
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2/2+Math.sqrt(8)/2,-Math.sqrt(8)-0.5,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.matroxo.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
      this.diamond.enableNormalViz();
      this.triangle.enableNormalViz();
      this.parallelogram.enableNormalViz();
      this.triangleSmall.enableNormalViz();
      this.triangleBig.enableNormalViz();
    }

    disableNormalViz() {
      this.diamond.disableNormalViz();
      this.triangle.disableNormalViz();
      this.parallelogram.disableNormalViz();
      this.triangleSmall.disableNormalViz();
      this.triangleBig.disableNormalViz();
    }
}

