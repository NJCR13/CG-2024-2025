import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyPyramid } from './MyPyramid.js';

export class MyTree extends CGFobject {
    constructor(scene, tilt, eixo=0, radius, height, color){
        super(scene);
        this.tilt = tilt;
        this.radius = radius;
        this.height = height;
        this.color = color;
        this.eixo = eixo ? 0 : 1;
        this.trunk = new MyCone(this.scene, 20, 20);
        this.crownie = new MyPyramid(this.scene, 6, 6);
        this.initMaterials();
    }
    initMaterials() {
        this.trunkTexture = new CGFtexture(this.scene, "textures/tronquinho.jpg");
        this.cortrunk = new CGFappearance(this.scene);
        this.cortrunk.setTexture(this.trunkTexture);
        this.cortrunk.setTextureWrap('REPEAT', 'REPEAT');
        this.cortrunk.setAmbient(0.45, 0.29, 0.17, 1.0);
        this.cortrunk.setDiffuse(0.45, 0.29, 0.17, 1);
        this.cortrunk.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.cortrunk.setShininess(10.0);
        

        this.corcrown = new CGFappearance(this.scene);
        this.crownTexture = new CGFtexture(this.scene, "textures/folhinha.jpg");
        this.corcrown.setTexture(this.crownTexture);
        this.corcrown.setTextureWrap('REPEAT', 'REPEAT');
        this.corcrown.setAmbient(0, this.color, 0, 1.0);
        this.corcrown.setDiffuse(0, this.color, 0, 1);
        this.corcrown.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.corcrown.setShininess(10.0);
    }
    display(){
        // Trunk
        this.scene.pushMatrix();
        // var eixox = Math.random();
        // var eixoz = 1 - eixox;
        if (this.eixo == 0) {
            this.scene.rotate(this.tilt, 1, 0, 0);
        }
        else if (this.eixo == 1) {
            this.scene.rotate(this.tilt, 0, 0, 1);

        }


        this.scene.pushMatrix();
        this.scene.scale(this.radius,this.height,this.radius);
        this.cortrunk.apply();
        this.trunk.display();
        this.scene.popMatrix();
        
        // Crown
        var altura = this.height*0.80

        for(var i = 0; i < (Math.floor(altura / 2)+1);i++){
            this.scene.pushMatrix();
            this.scene.translate(0,this.height-(2*i),0);
            this.scene.scale(this.radius+i,4,this.radius+i);
            this.corcrown.apply();
            this.crownie.display();
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();
            
        
    }
}