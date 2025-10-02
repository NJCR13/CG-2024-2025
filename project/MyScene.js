import { CGFscene, CGFcamera, CGFaxis, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyBuilding } from "./MyBuilding.js";
import { MyForest } from "./MyForest.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyTree } from "./MyTree.js";
import { MyHeli } from "./MyHeli.js";
import { MyFire } from "./MyFire.js";
import { MyLake } from "./MyLake.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();
    this.initTextures();

    //Background color
    this.gl.clearColor(0, 0, 0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    this.setUpdatePeriod(50);

    this.appStartTime=Date.now(); // current time in milisecs

    //Initialize scene objects
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);
    this.sphere = new MySphere(this, 40, 40, -1);
    this.building = new MyBuilding(this, 30, 10, 2, this.textureW, 5, 3, 2);
    this.pan = new MyPanorama(this, this.texturePan);
    // this.tree = new MyTree(this, Math.PI/8, 1, 2, 15, 0.34);
    this.forest = new MyForest(this,10, 10, 100, 100);
    this.helicopter = new MyHeli(this);
    this.fire = new MyFire(this);
    this.lake = new MyLake(this);

    this.grass = new CGFappearance(this);
    this.grass.loadTexture('textures/grass.jpg');
    this.grass.setTextureWrap('REPEAT', 'REPEAT');

    this.earth = new CGFappearance(this);
    this.earth.loadTexture('textures/earth.jpg');
    this.earth.setTextureWrap('REPEAT', 'REPEAT');

    // Displays
    this.displayAxis = false;
    this.displayPlane = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayBuilding = true;
    this.displayForest = true;
    this.displayFire = false;
    this.displayLake = true;
    this.scaleFactor = 1;

    this.lastT = 0;
  }
  initTextures() {
    this.textureGrass = new CGFtexture(this, "textures/grass.jpg");
    this.textureSphere = new CGFtexture(this, "textures/earth.jpg");
    this.texturePan = new CGFtexture(this, "textures/panorama.jpg");
    this.textureW = new CGFtexture(this, "textures/window4.jpg");
  }
  initLights() {
    this.lights[0].setPosition(200, 200, 200, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(20, 20, 20),
      vec3.fromValues(0, 0, 0)
    );
    // this.camera = new CGFcamera(
    //   1.5,
    //   0.1,
    //   1000,
    //   vec3.fromValues(-85, 26, -90),
    //   vec3.fromValues(-85, 20, -100)
    // );
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.helicopter.accelerate(this.scaleFactor);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      this.helicopter.accelerate(-this.scaleFactor);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.helicopter.turn(this.scaleFactor/10);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.helicopter.turn(-this.scaleFactor/10);
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      this.helicopter.reset();
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      this.helicopter.takeoff(this.lastT / 1000);
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyL")) {
      text += " L ";
      this.helicopter.landing(this.lastT / 1000);
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyO")){
      text += " O ";
      if(this.helicopter.isFull){
        this.forest.checkFirePos(this.helicopter.position.x - 85,  this.helicopter.position.z -94.2, this.lastT / 1000);
        // this.helicopter.openBucket = true;
        this.helicopter.BucketOpen(this.lastT / 1000);
      }
    }
    if (keysPressed)
      console.log(text);
  }

  update(t) {
    if(this.lastT == 0){
      this.lastT = t;
    }
    let delta_t = (t - this.lastT) / 1000;
    this.lastT = t; 
    let teste = this.lastT / 1000;  
    this.forest.update(teste);
    this.helicopter.update(delta_t, teste);
    this.checkKeys();
  }

  setDefaultAppearance() {
    this.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.lights[0].update();

    // Draw axis
    if(this.displayAxis) this.axis.display();


    this.setDefaultAppearance();

    this.pushMatrix();
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.popMatrix();

    // Plano
    if(this.displayPlane) {
      this.pushMatrix();
      this.scale(400, 1, 400);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.grass.apply();
      this.plane.display();
      this.popMatrix();
    }

    // Sphere
    if(this.displaySphere) {
      this.pushMatrix();
      this.scale(200, 200, 200);
      this.rotate(Math.PI / 2, 1, 0, 0);
      this.earth.apply();
      this.sphere.display();
      this.popMatrix();
    }

    // Building
    if(this.displayBuilding) {
      this.pushMatrix();
      this.translate(-100, 0, -100);
      this.building.display();
      this.popMatrix();
    }

    // Forest
    if(this.displayForest) {  
      this.pushMatrix();
      this.translate(-100,0,56);
      this.forest.display();
      this.popMatrix();
    }

    // Helicopter
    this.pushMatrix();
    this.helicopter.display();
    this.popMatrix();

    // Fire
    if(this.displayFire) {
      this.pushMatrix();
      this.fire.display();
      this.popMatrix();
    }

    // Lake
    if(this.displayLake) {
      this.pushMatrix();
      this.lake.display();
      this.popMatrix();
    }

    // Panorama
    if(this.displayPanorama) {
      this.pan.display();
    }

  }
}
