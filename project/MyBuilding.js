import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyWindow } from './MyWindow.js';
import { MyCircle } from './MyCircle.js';

export class MyBuilding extends CGFobject {
    constructor(scene, width,depth, windows, windowType, height, floors, color){
        super(scene);
        this.floors = floors;
        this.height = height;
        this.width = width/3;
        this.depth = depth;
        this.windows = windows;
        this.buildingcolor = color;
        this.scalefactor = (this.width/this.windows)/2;

        this.window = new MyWindow(this.scene, this.scalefactor, windowType);
        this.unitCube = new MyUnitCubeQuad(this.scene);
        this.plane = new MyPlane(this.scene);
        this.circle = new MyCircle(this.scene, 50);

        this.initBuffers();
        this.initMaterials();
    }
    initMaterials() {
        if(this.buildingcolor == 0) {
            this.cor = new CGFappearance(this.scene);
            this.cor.setAmbient(0, 0, 0, 1.0);
            this.cor.setDiffuse(0,0,0,1);
            this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
            this.cor.setShininess(10.0);
        }
        if(this.buildingcolor == 1) {
            this.cor = new CGFappearance(this.scene);
            this.cor.setAmbient(1, 1, 1, 1.0);
            this.cor.setDiffuse(1,1,1,1);
            this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
            this.cor.setShininess(10.0);
        }
        if(this.buildingcolor == 2) {
            this.cor = new CGFappearance(this.scene);
            this.cor.setAmbient(1, 0, 0, 1.0);
            this.cor.setDiffuse(1,0,0,1);
            this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
            this.cor.setShininess(10.0);
        }
        if(this.buildingcolor == 3) {
            this.cor = new CGFappearance(this.scene);
            this.cor.setAmbient(0, 1, 0, 1.0);
            this.cor.setDiffuse(0,1,0,1);
            this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
            this.cor.setShininess(10.0);
        }
        if(this.buildingcolor == 4) {
            this.cor = new CGFappearance(this.scene);
            this.cor.setAmbient(0, 0, 1, 1.0);
            this.cor.setDiffuse(0,0,1,1);
            this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
            this.cor.setShininess(10.0);
        }
        
        this.signTexture = new CGFtexture(this.scene, "textures/bumbeiros.png");
        this.signfirefighter = new CGFappearance(this.scene);
        this.signfirefighter.setTexture(this.signTexture);
        this.signfirefighter.setTextureWrap('REPEAT', 'REPEAT');

        this.portaTexture = new CGFtexture(this.scene, "textures/door.jpg");
        this.porta = new CGFappearance(this.scene);
        this.porta.setTexture(this.portaTexture);
        this.porta.setTextureWrap('REPEAT', 'REPEAT');

        this.helipadTexture = new CGFtexture(this.scene, "textures/heli2.png");
        this.helipad = new CGFappearance(this.scene);
        this.helipad.setTexture(this.helipadTexture);
        this.helipad.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){
        // Building 
        this.scene.pushMatrix();
        this.scene.translate(this.width/2, (this.height*this.floors)/2, (this.depth*0.75)/2);
        //left Side Module
        this.scene.pushMatrix();
        this.scene.scale(this.width, this.height*this.floors, this.depth*0.75);
        this.cor.apply();
        this.unitCube.display();
        this.scene.popMatrix();
        //Main Module
        this.scene.pushMatrix();
        this.scene.translate(this.width,this.height/2,(this.depth*0.25)/2);
        this.scene.scale(this.width, this.height*(this.floors+1), this.depth);
        this.cor.apply();
        this.unitCube.display();
        this.scene.popMatrix();
        //Right Side Module
        this.scene.pushMatrix();
        this.scene.translate((2*this.width),0,0);
        this.scene.scale(this.width, this.height*this.floors, this.depth*0.75);
        this.cor.apply();
        this.unitCube.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        
        // Windows
        for(var i = 0; i < this.floors; i++) {
            for(var j = 0; j < this.windows; j++) {
                this.scene.pushMatrix();
                this.scene.translate(((this.width/this.windows)*j)+(((this.width/this.windows)-this.scalefactor)/2), i*this.height+((this.height-this.scalefactor)/2), this.depth*0.75+0.1)
                this.window.display();
                this.scene.popMatrix();
            }
        }
        for(var i = 0; i < this.floors; i++) {
            for(var j = 0; j < this.windows; j++) {
                this.scene.pushMatrix();
                this.scene.translate((this.width*2)+((this.width/this.windows)*j)+(((this.width/this.windows)-this.scalefactor)/2), i*this.height+((this.height-this.scalefactor)/2), this.depth*0.75+0.1)
                this.window.display();
                this.scene.popMatrix();
            }
        }
        for(var i = 1; i < this.floors+1; i++) {
            for(var j = 0; j < this.windows; j++) {
                this.scene.pushMatrix();
                this.scene.translate((this.width)+((this.width/this.windows)*j)+(((this.width/this.windows)-this.scalefactor)/2), i*this.height+((this.height-this.scalefactor)/2), this.depth+0.1)
                this.window.display();
                this.scene.popMatrix();
            }
        }
        
        // Firefighter entrance sign
        this.scene.pushMatrix();
        this.scene.translate((this.width*3)/2, 4.25, this.depth+0.1)
        this.scene.scale(this.width/2,this.height/3,1);
        this.signfirefighter.apply();
        this.plane.display();
        this.scene.popMatrix();

        // Door
        this.scene.pushMatrix();
        this.scene.translate((this.width*3)/2, this.height*2/6, this.depth+0.1)
        this.scene.scale(this.height/3,this.height*2/3,1);
        this.porta.apply();
        this.plane.display()
        this.scene.popMatrix();

        // Helipad
        this.scene.pushMatrix();
        this.scene.translate(this.width*3/2, this.height*this.floors + this.height+0.1, this.depth/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(3,3,3);
        this.helipad.apply();
        this.circle.display();
        this.scene.popMatrix();

    }
}