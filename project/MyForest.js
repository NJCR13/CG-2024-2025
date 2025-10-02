import {CGFappearance, CGFtexture, CGFobject} from '../lib/CGF.js';
import { MyTree } from './MyTree.js';
import { MyFire } from './MyFire.js';


export class MyForest extends CGFobject {
    constructor(scene, rows, cols, width, depth){
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.depth = depth;
        this.createTrees();
    }
    createTrees(){
        this.forest = [];
        this.fire = [];
        this.variations = [];
        this.isFire =[];
        for(var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                var isThisFire = Math.floor(Math.random() *5);
                var variation = Math.floor(Math.random()*5);
                var tilt = Math.floor(Math.random()*21);
                tilt = tilt * (Math.PI/180);
                var eixos = Math.floor(Math.random()*2);
                var height = Math.floor(Math.random()*16)+5;
                var radius = height / 9;
                var color = Math.random();
                this.forest.push(new MyTree(this.scene , tilt, eixos, radius, height, color));
                if(isThisFire == 1){
                    this.fire.push(new MyFire(this.scene));
                }else{
                    this.fire.push(0);
                }
                this.variations.push(variation);
                this.isFire.push(isThisFire);
            }
        }
    }

    update(t){
        for(var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                if(this.isFire[i*this.cols+j] == 1){
                    this.fire[i*this.cols +j].update(t);
                }
            }
        }
    }

    checkFirePos(x, y, t){
        for(var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                if(this.isFire[i*this.cols+j] == 1){
                    if(this.fire[i*this.cols +j].checkCoords(x, y)){
                        this.fire[i*this.cols +j].updateHealth(t);
                        this.fire[i*this.cols +j].display();
                    }
                }
            }
        }
    }

    display() {
        for(var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                this.scene.pushMatrix();
                this.scene.translate((this.variations[i*this.cols + j])+ (i* (this.width/this.rows)), 0, (this.variations[i*this.cols + j])+ (j* (this.depth/this.cols)));
                if(this.isFire[i*this.cols+j] == 1){
                    this.fire[i*this.cols +j].display();
                    this.fire[i*this.cols +j].updateCoords((this.variations[i*this.cols + j])+ (i* (this.width/this.rows)),(this.variations[i*this.cols + j])+ (j* (this.depth/this.cols)));
                }
                this.forest[i*this.cols + j].display();
                this.scene.popMatrix();
            }
        }
    }

}