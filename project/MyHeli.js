import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyCone } from './MyCone.js';
import { MySphere } from './MySphere.js';
import { MyQuad } from './MyQuad.js';
import { MyCylinder } from './MyCylinder.js';
import { MyParallelogram } from './MyParellelogram.js';
import { MyHeliAnimator } from './MyHeliAnimator.js';


export class MyHeli extends CGFobject {
    constructor(scene, x=0, y=0, z=0, ori=0, velVector = { x: 0, y: 0, z: 0 }) {
        super(scene);
        this.sphere = new MySphere(this.scene,40,40,1);
        this.circle = new MyCircle(this.scene);
        this.cone = new MyCone(this.scene, 50, 50);
        this.water = new MyCylinder(this.scene, 20, 20);
        this.cyl = new MyCylinder(this.scene, 50, 50);
        this.quad = new MyQuad(this.scene);
        this.para = new MyParallelogram(this.scene);

        this.position = {x: x, y: y, z: z};
        this.default_position = { x: 0, y: 0, z: 0 };
        this.orientation = ori;
        this.velocity = velVector;
        this.speed = 0;

        this.heliAnim = null;
        this.helicespeed = 0;
        this.takeoffAnim = null;
        this.path_to_landingAnimX = null;
        this.path_to_landingAnimZ = null;
        this.landingAnim = null;
        this.intheAir = false;
        this.aboveHelipad = true;
        this.turned_to_helipad = false;
        this.turn_to_Helipad = null;
        this.turn_to_front = null;
        this.reduceSpeed = null;
        this.openBucket = false;
        this.releaseBucketAnim = null;
        this.retrieveBucketAnim = null;
        this.bucketHeight = 0;
        this.overLake = false;
        this.overFire = false;
        this.isFull = false;
        this.canMove = true;
        this.waterHeight = 0;
        
        this.initMaterials();
    }
    initMaterials() {
        this.placeholder = new CGFappearance(this.scene);
        this.placeholder.setAmbient(1,1,1,1);

        this.signTexture = new CGFtexture(this.scene, "textures/DNALOP.png");
        this.signfirefighter = new CGFappearance(this.scene);
        this.signfirefighter.setTexture(this.signTexture);
        this.signfirefighter.setTextureWrap('REPEAT', 'REPEAT');

        this.chrometex = new CGFtexture(this.scene, "textures/DNALOP.png");
        this.chrome = new CGFappearance(this.scene);
        this.chrome.setTexture(this.chrometex);
        this.chrome.setTextureWrap('REPEAT', 'REPEAT');

        this.windowtexture = new CGFtexture(this.scene, "textures/heliwindow.png");
        this.heliw = new CGFappearance(this.scene);
        this.heliw.setTexture(this.windowtexture);
        this.heliw.setTextureWrap('REPEAT', 'REPEAT');

        this.watertexture = new CGFtexture(this.scene, "textures/lake.jpg");
        this.waterT = new CGFappearance(this.scene);
        this.waterT.setTexture(this.watertexture);
        this.waterT.setTextureWrap('REPEAT', 'REPEAT');

        this.corvermelha = new CGFappearance(this.scene);
        this.corvermelha.setAmbient(1, 0, 0, 1.0);
        this.corvermelha.setDiffuse(1, 0, 0, 1);
        this.corvermelha.setSpecular(1, 0, 0, 1.0);
        this.corvermelha.setShininess(10.0);

        this.corpreta = new CGFappearance(this.scene);
        this.corpreta.setAmbient(0, 0, 0, 1.0);
        this.corpreta.setDiffuse(0, 0, 0, 1);
        this.corpreta.setSpecular(0, 0, 0, 1.0);
        this.corpreta.setShininess(10.0);

        this.corbranca = new CGFappearance(this.scene);
        this.corbranca.setAmbient(1, 1, 1, 1.0);
        this.corbranca.setDiffuse(1, 1, 1, 1);
        this.corbranca.setSpecular(1, 1, 1, 1.0);
        this.corbranca.setShininess(10.0);
    }
    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.translate(-85,21.5,-94.2);
        this.scene.rotate(this.orientation,0,1,0);

        if(this.intheAir) {
            if (this.speed > 0.05)
                this.scene.rotate(Math.PI / 12, 1, 0, 0);
            if (this.speed < -0.05)
                this.scene.rotate(-Math.PI / 12, 1, 0, 0);
        }   

        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.heliw.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(5,1.01,1.01);
        this.scene.translate(0.191, 0, 0);
        this.scene.rotate(Math.PI/2,1,0,0)
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.chrome.apply();
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.3,0.5,1);
        this.scene.translate(-0.2,-1,0);
        this.signfirefighter.apply();
        this.sphere.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1.01,1.01,1.01);
        this.signfirefighter.apply();
        this.cyl.display();
        this.scene.popMatrix();

        
        // COISAS DE ATERRAR
        this.scene.pushMatrix();
        this.scene.scale(2,0.1,0.1);
        this.scene.translate(-0.1, -13, 7);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(2,0.1,0.1);
        this.scene.translate(-0.1, -13, -7);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();

        
        //coisa que liga ao coiso de aterrar DIREITA
        this.scene.pushMatrix();
        this.scene.translate(0.3,-0.6,0);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.scene.scale(0.1,0.1,-1);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.6,0);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.scene.scale(0.1,0.1,-1);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();

        //coisa que liga ao coiso de aterrar Esquerda
        this.scene.pushMatrix();
        this.scene.translate(0.3,-0.6,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.scene.scale(0.1,0.1,1);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.6,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.scene.scale(0.1,0.1,1);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();


        // HELICE
        this.scene.pushMatrix();
        this.scene.translate(0.6,1.1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.1,0.1,0.1);
        this.corbranca.apply();
        this.cyl.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.11,0);
        this.scene.translate(0.6,0,0);
        if(this.intheAir || this.takeoffAnim)
            this.scene.rotate(this.helicespeed,0,1,0);
        this.scene.scale(6,1,0.2);
        this.scene.translate(0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.corpreta.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.11,0);
        this.scene.translate(0.6,0,0);
        if(this.intheAir || this.takeoffAnim)
            this.scene.rotate(this.helicespeed,0,1,0);
        this.scene.scale(0.2,1,6);
        this.scene.translate(0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.corpreta.apply();
        this.quad.display();
        this.scene.popMatrix();

        // HELICE BACK
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(5,0,0);
        this.scene.scale(0.4,1.5,1);
        this.corvermelha.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.65,0,0);
        this.scene.scale(1,1.5,1);
        this.scene.scale(0.3,1,1);
        this.scene.scale(0.5,0.5,0.5);
        this.corvermelha.apply();
        this.para.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.65,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.scale(-0.3,1,1);
        this.corbranca.apply();
        this.para.display();
        this.scene.popMatrix();

        /// Helice que gira
        this.scene.pushMatrix();
        this.scene.translate(5.9,0.5,0.01);
        if(this.intheAir || this.takeoffAnim)
            this.scene.rotate(this.helicespeed,0,0,1);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.scale(0.1,1,1);
        this.corpreta.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5.9,0.5,0.01);
        if(this.intheAir || this.takeoffAnim)
            this.scene.rotate(this.helicespeed,0,0,1);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.1,1,1);
        this.corpreta.apply();
        this.quad.display();
        this.scene.popMatrix();
        

        // Water Bucket
        // if(this.releaseBucketAnim || this.retrieveBucketAnim || this.intheAir) {
        if(this.bucketHeight != 0) {
            this.scene.pushMatrix();
            this.scene.translate(0.6, this.bucketHeight, 0);

            /// String attacthed to bucket
            this.scene.pushMatrix();
            this.scene.translate(0, 0.01, 0);
            this.scene.scale(0.1, this.bucketHeight, 0.1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.corpreta.apply();
            this.cyl.display();
            this.scene.popMatrix();

            /// Bucket TOP PART
            this.scene.pushMatrix();
            // this.scene.translate(0, 2, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();
            /// Bucket RIGHT PART
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, -0.5);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();
            /// Bucket LEFT PART
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0.5);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();
            /// Bucket FRONT PART
            this.scene.pushMatrix();
            this.scene.translate(-0.5, -0.5, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();
            /// Bucket BACK PART
            this.scene.pushMatrix();
            this.scene.translate(0.5, -0.5, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();

            /// Bucket Open right
            this.scene.pushMatrix();
            this.scene.translate(0, -1, -0.25);
            if (this.openBucket) {
                this.scene.translate(0, -Math.SQRT2 / 8, -Math.SQRT2 / 8 - 0.25);
                this.scene.rotate(7 * Math.PI / 4, 1, 0, 0);
            }
            this.scene.scale(1, 1, 0.5);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();
            /// Bucket Open left
            this.scene.pushMatrix();
            this.scene.translate(0, -1, 0.25);
            if (this.openBucket) {
                this.scene.translate(0, -Math.SQRT2 / 8, Math.SQRT2 / 8 + 0.25);
                this.scene.rotate(-7 * Math.PI / 4, 1, 0, 0);
            }
            this.scene.scale(1, 1, 0.5);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.corbranca.apply();
            this.quad.display();
            this.scene.popMatrix();

            this.scene.popMatrix();
        }
        
        if(this.bucketHeight != 0) {
            this.scene.pushMatrix();
            this.scene.translate(0,this.bucketHeight-0.01,0);
            this.scene.translate(0.6,0,0);
            if(this.openBucket) {
                this.scene.scale(1,this.waterHeight,1);
            }
            this.scene.scale(0.5, 0.9, 0.5);
            this.scene.rotate((Math.PI / 2), 1, 0, 0);
            this.waterT.apply();
            this.water.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    update(delta_t, t) {
        if((this.position.x != this.default_position.x) || (this.position.z != this.default_position.z)) {
            this.aboveHelipad = false;
        }

        let maxRpm = 1;
        let minRpm = 0.5;

        if(this.takeoffAnim && !this.overLake) {
            this.releaseBucket(t);
            this.takeoffAnim.update(t);
            this.releaseBucketAnim.update(t);
            this.position.y = this.takeoffAnim.animVal;
            this.bucketHeight = this.releaseBucketAnim.animVal;
            this.helicespeed += Math.PI/12 * minRpm;
            if(t >= this.takeoffAnim.animStartTimeSecs + this.takeoffAnim.animDurationSecs) {
                this.takeoffAnim = null;
                this.releaseBucketAnim = null;
                if(this.position.y == 5) {
                    this.intheAir = true;
                    this.canMove = true;
                }
            }
        }

        if(this.takeoffAnim && this.overLake) {
            this.takeoffAnim.update(t);
            this.position.y = this.takeoffAnim.animVal;
            this.helicespeed += Math.PI/12 * minRpm;
            if(t >= this.takeoffAnim.animStartTimeSecs + this.takeoffAnim.animDurationSecs) {
                this.takeoffAnim = null;
                if(this.position.y == 5) {
                    this.intheAir = true;
                    this.canMove = true;
                }
            }
        }

        if(this.reduceSpeed) {
            this.canMove = false;
            this.reduceSpeed.update(t);
            this.speed = this.reduceSpeed.animVal;

            this.velocity.x = Math.sin(this.orientation)*this.speed;
            this.velocity.z = Math.cos(this.orientation)*this.speed;
            
            if(t >= this.reduceSpeed.animStartTimeSecs + this.reduceSpeed.animDurationSecs) {
                this.reduceSpeed = null;
                if(this.speed == 0)
                    this.turned_to_helipad = true;
            }
        }

        if(this.turn_to_Helipad && this.turned_to_helipad) {
            this.turn_to_Helipad.update(t);
            this.orientation = this.turn_to_Helipad.animVal;
            if(t >= this.turn_to_Helipad.animStartTimeSecs + this.turn_to_Helipad.animDurationSecs) {
                this.turn_to_Helipad = null;
            }
        }

        if(this.path_to_landingAnimX && this.path_to_landingAnimX) {
            this.path_to_landingAnimX.update(t);
            this.path_to_landingAnimZ.update(t);
            this.position.x = this.path_to_landingAnimX.animVal;
            this.position.z = this.path_to_landingAnimZ.animVal;
            if((this.position.x == this.default_position.x) && (this.position.z == this.default_position.z)) {
                this.aboveHelipad = true;

                // this.path_to_landingAnimX = null;
                // this.path_to_landingAnimZ = null;
            }
        }

        if(this.turn_to_front && this.aboveHelipad) {
            this.turn_to_front.update(t);
            this.orientation = this.turn_to_front.animVal;
            if(t >= this.turn_to_front.animStartTimeSecs + this.turn_to_front.animDurationSecs) {
                this.turn_to_front = null;
                this.turned_to_helipad = false;
            }
        }

        if(this.landingAnim && this.aboveHelipad) {
            this.canMove = false;
            this.retrieveBucket(this.landingAnim.animStartTimeSecs-2.0);
            this.landingAnim.update(t);
            this.retrieveBucketAnim.update(t);
            this.position.y = this.landingAnim.animVal;
            this.bucketHeight = this.retrieveBucketAnim.animVal;
            this.helicespeed -= Math.PI/12 * minRpm;
            if(t >= this.landingAnim.animStartTimeSecs + this.landingAnim.animDurationSecs) {
                this.landingAnim = null;
                this.path_to_landingAnimX = null;
                this.path_to_landingAnimZ = null;
                this.retrieveBucketAnim = null;
                if(this.position.y == 0) {
                    this.intheAir = false;
                }
                this.velocity.x = 0;
                this.velocity.z = 0;
            }
        }

        if(this.landingAnim && this.overLake) {
            this.canMove = false;
            this.velocity.x = 0;
            this.velocity.z = 0;
            this.landingAnim.update(t);
            this.position.y = this.landingAnim.animVal;
            this.helicespeed -= Math.PI/12 * minRpm;
            if(t >= this.landingAnim.animStartTimeSecs + this.landingAnim.animDurationSecs) {
                this.landingAnim = null;
                this.isFull = true;
                if(this.position.y == 0) {
                    this.intheAir = false;
                }
            }
        }

        if(this.waterFallAnim && this.openBucket) {
            this.waterFallAnim.update(t);
            this.waterHeight = this.waterFallAnim.animVal;
             if(t >= this.waterFallAnim.animStartTimeSecs + this.waterFallAnim.animDurationSecs) {
                this.waterFallAnim = null;
                this.openBucket = false;
                this.waterHeight = 0;
            }
        }

        if(this.intheAir && !this.takeoffAnim)
            this.helicespeed += Math.PI/12 * maxRpm;

        if(this.position.x > 9 && this.position.x < 58 && this.position.z > 120 && this.position.z < 140) {
            this.overLake = true;
        }
        else {
            this.overLake = false;
        }
        
        this.position.x += this.velocity.x * delta_t;
        this.position.z += this.velocity.z * delta_t;

        console.log(this.position);
        console.log("speed:" + this.speed);
        console.log("orientation:" + this.orientation);
        console.log("aboveHelipad:" + this.aboveHelipad);
        console.log("intheAir:" + this.intheAir);
        console.log("turned to helipad:" + this.turned_to_helipad);
        console.log("bucket height:" + this.bucketHeight);
        console.log("over lake: " + this.overLake);
        console.log("is Full: " + this.isFull);
    }

    turn(v) {
        if(this.intheAir && this.canMove){
            this.orientation += v;

            // let speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);

            // this.velocity[Math.cos(v)*speed, this.velocity.y, Math.sin(v)*speed];
            this.velocity.x = Math.sin(this.orientation)*this.speed;
            this.velocity.z = Math.cos(this.orientation)*this.speed;
        }
    }

    accelerate(v) {
        // let speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2) * 
        //             Math.sign(this.velocity.x * Math.sin(this.orientation) + this.velocity.z * Math.cos(this.orientation));

        // // let newSpeed = Math.max(speed + v, 0);
        // let newSpeed = speed + v;
        if(this.intheAir && this.canMove){
            this.speed += v;

            this.velocity.x = Math.sin(this.orientation)*this.speed;
            this.velocity.z = Math.cos(this.orientation)*this.speed;
        }
    }

    reset() {
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.orientation = 0;
        this.velocity.x = 0;
        this.velocity.z = 0;
        this.velocity.z = 0;
        this.speed = 0;
        this.heliAnim = false;
        this.helicespeed = 0;
        this.intheAir = false;
        this.aboveHelipad = true;
        this.heliAnim = null;
        this.helicespeed = 0;
        this.takeoffAnim = null;
        this.path_to_landingAnimX = null;
        this.path_to_landingAnimZ = null;
        this.landingAnim = null;
        this.turn_to_Helipad = null;
        this.turn_to_front = null;
        this.turned_to_helipad = false;
        this.waterFallAnim = null;
        this.isFull = false;
        this.canMove = false;
        this.openBucket = false;
        this.waterHeight = 0;
    }

    takeoff(t) {
        if (!this.takeoffAnim && this.aboveHelipad || this.overLake) {
            var verticalSpeed = 2.5;

            // if(!this.overLake) {
            //     var verticalDistance = this.position.y + 5;
            // } else {
            // }

            var verticalDistance = Math.abs(this.position.y) + 5;

            var verticalDuration = verticalDistance / verticalSpeed;

            this.takeoffAnim = new MyHeliAnimator(this.position.y, 5, t, verticalDuration);
        }

        // if(!this.landingAnim && this.overLake == true && (this.speed > 0.05 || this.speed < 0.05) ) {
        //     var verticalSpeed = 2.5;

        //     var verticalDistance = this.position.y + 17.5;

        //     var verticalDuration = verticalDistance / verticalSpeed;

        //     this.landingAnim = new MyHeliAnimator(this.position.y, -17.5, t, verticalDuration);
        // }
    }

    landing(t) { 
        if (!this.landingAnim && this.overLake == false) {
            var timeTaken = t;
            var reducespeedDuration = 1;

            if(this.speed > 0.05 || this.speed < 0.05) {
                this.reduceSpeed = new MyHeliAnimator(this.speed, 0, t, reducespeedDuration);
                timeTaken = t + 0.5 + reducespeedDuration;
            }

            var distX = this.default_position.x - this.position.x;
            var distZ = this.default_position.z - this.position.z;

            var horizontalDistance = Math.sqrt(distX ** 2 + distZ ** 2);

            var targetOrientation = Math.atan2(distX, distZ);
            var hello = this.orientation
            var orientationfixDuration = 2;

            if(horizontalDistance != 0) {
                this.turn_to_Helipad = new MyHeliAnimator(hello, targetOrientation, timeTaken, orientationfixDuration);
                timeTaken = timeTaken + 0.5 + orientationfixDuration;
            }




            var horizontalSpeed = 2;

            var horizontalDuration = horizontalDistance / horizontalSpeed;

            if(horizontalDistance != 0) {
                this.path_to_landingAnimX = new MyHeliAnimator(this.position.x, this.default_position.x, timeTaken, horizontalDuration);
                this.path_to_landingAnimZ = new MyHeliAnimator(this.position.z, this.default_position.z, timeTaken, horizontalDuration);
                timeTaken = timeTaken + 0.5 + horizontalDuration;
            }


            var turn_to_front_duration = 2;

            if(this.targetOrientation != 0) {
                this.turn_to_front = new MyHeliAnimator(targetOrientation, 0, timeTaken, turn_to_front_duration);
                timeTaken = timeTaken + 0.5 + turn_to_front_duration;
            }

            
            var verticalSpeed = 2.5;

            var verticalDistance = this.position.y - 0;

            var verticalDuration = verticalDistance / verticalSpeed;

            this.landingAnim = new MyHeliAnimator(this.position.y, 0, timeTaken, verticalDuration);
        }

        if(!this.landingAnim && this.overLake == true && (this.speed > 0.05 || this.speed < 0.05) ) {
            var verticalSpeed = 2.5;

            var verticalDistance = this.position.y + 17.5;

            var verticalDuration = verticalDistance / verticalSpeed;

            this.landingAnim = new MyHeliAnimator(this.position.y, -17.5, t, verticalDuration);
        }
    }

    releaseBucket(t) {
        if(!this.releaseBucketAnim) {
            this.releaseBucketAnim = new MyHeliAnimator(0, -3, t+0.5, 1.5);
        }
    }

    retrieveBucket(t) {
        if(!this.retrieveBucketAnim) {
            this.retrieveBucketAnim = new MyHeliAnimator(-3, 0, t, 1.5);
        }
    }

    BucketOpen(t) {
        if(!this.waterFallAnim) {
            this.openBucket = true;
            this.waterFallAnim = new MyHeliAnimator(0, 17.5, t, 1.5);
        }
    }
} 