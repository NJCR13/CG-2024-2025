import {CGFappearance, CGFtexture, CGFobject, CGFshader} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyHeliAnimator } from './MyHeliAnimator.js';


export class MyFire extends CGFobject {
    constructor(scene, health=10000, x= 0, y=0) {
      super(scene);
      this.health= health;
      this.tri = new MyTriangle(this.scene);
      this.x = x;
      this.y = y;
      this.time = 0; 
      this.ExtinguishFireAnim = null;
      this.initMaterials();
    }

    initMaterials(){

        this.fireanim = new CGFshader(this.scene.gl, "shaders/fireanim.vert", "shaders/fireanim.frag");

        this.firetexture = new CGFtexture(this.scene, "textures/fire1.png");
        this.firet = new CGFappearance(this.scene);
        this.firet.setTexture(this.firetexture);
        this.firet.setTextureWrap('REPEAT', 'REPEAT');
        
        this.firetexture2 = new CGFtexture(this.scene, "textures/fire2.png");
        this.firet2 = new CGFappearance(this.scene);
        this.firet2.setTexture(this.firetexture2);
        this.firet2.setTextureWrap('REPEAT', 'REPEAT');

        this.cor = new CGFappearance(this.scene);
        this.cor.setAmbient(1, 0, 0, 1.0);
        this.cor.setDiffuse(1,0,0,1);
        this.cor.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.cor.setShininess(10.0);
    }

    createFire() {
        this.fire = [];
        this.variations = [];
    }

    display() {
        this.scene.pushMatrix();
        if (Math.floor(this.time * 5) % 2 === 0) {
            this.firet.apply();
        } else {
            this.firet2.apply();
        }
        this.createFires();
        this.scene.popMatrix();
    }

    updateCoords(x, y){
        this.x = x-100;
        this.y = y+56;
    }


    checkCoords(x, y){
        if(x >= this.x - 20 && x<= this.x + 20 && y >= this.y - 20 && y <= this.y + 20){
            return true;
        }else{
            return false;
        }
    }
    
    createFires() {
        
            this.scene.pushMatrix();
            this.scene.scale(10*(this.health/10000),12*(this.health/10000),10*(this.health/10000));
            this.scene.pushMatrix();
            this.tri.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 0,1,0);
            this.scene.translate(0.5,0,0.5);
            this.tri.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 0,1,0);
            this.scene.translate(0.5,0,-0.5);
            this.tri.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,0,-1);
            this.tri.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,0,-0.5);
            this.scene.rotate(Math.PI/4, 0,1,0);
            this.scene.scale(Math.sqrt(2), 1, Math.sqrt(2));

            this.tri.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,0,-0.5);
            this.scene.rotate(-Math.PI/4, 0,1,0);
            this.scene.scale(Math.sqrt(2), 1, Math.sqrt(2));

            this.tri.display();
            this.scene.popMatrix();
            
            this.scene.popMatrix();
        
    }

    update(t){
        this.fireanim.setUniformsValues({uSampler2: 1 });
		this.fireanim.setUniformsValues({ timeFactor: 0 });
        this.setActiveShader(this.fireanim);
        this.time = t;
        if(this.ExtinguishFireAnim) {
            this.ExtinguishFireAnim.update(t);
            this.health = this.ExtinguishFireAnim.animVal;
             if(t >= this.ExtinguishFireAnim.animStartTimeSecs + this.ExtinguishFireAnim.animDurationSecs) {
                this.ExtinguishFireAnim = null;
            }
        }
    }

    updateHealth(t){
        if(this.health > 0) {
            this.ExtinguishFireAnim = new MyHeliAnimator(this.health, 0, t+1.5, 5);
        // this.health -= 10000;
        }
    }


  }