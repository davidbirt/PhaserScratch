/// <reference path="./services/phaser.d.ts" />
import { Component } from '@angular/core';

class Bullet{
  constructor(){
    this.speed = 400;
    this.interval = 250;
    this.lifespan = 2000;
    this.maxCount = 30;

  }
  speed:number;
  interval:number;
  lifespan:number;
  maxCount:number;
}

class SimpleGame {
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render, checkBoundary : this.checkBoundary });
    this.bulletInterval = 0;
  }

  game: Phaser.Game;
  ship: Phaser.Sprite;
  asteroids: Phaser.Group;
  key_left: Phaser.Key;
  key_right: Phaser.Key;
  key_thrust: Phaser.Key;
  key_reverse: Phaser.Key;
  key_fire : Phaser.Key;
  bulletGroup: Phaser.Weapon;
  bulletInterval:number;

  preload() {
    this.game.load.image('bg', '../assets/bg2.jpg');
    this.game.load.image('asteroid', '../assets/asteroids/ast_med.png');
    // this.game.load.image('logo', '../assets/phaser-logo-small.png');
    this.game.load.image('bullet', '../assets/bullets/lazer.png');
    this.game.load.image('ship', '../assets/ship.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // setup the background
    this.game.add.sprite(0, 0, 'bg');

    // Add asteroids group to the game world.
    this.asteroids = this.game.add.group();
    this.asteroids.enableBody = true;

    // setup the ship and its physics
    this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.ship.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    this.ship.body.drag.set(100);
    this.ship.body.maxVelocity.set(300);
    
    // need a group for the bullets
    this.bulletGroup = this.game.add.weapon(30,'bullet');
    
    // setup user input
    this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  checkBoundary() {
    if (this.ship.x < 0) {
      this.ship.x = this.game.width;
    } else if (this.ship.x > this.game.width) {
      this.ship.x = 0;
    }

    if (this.ship.y < 0) {
      this.ship.y = this.game.height;
    } else if (this.ship.y > this.game.height) {
      this.ship.y = 0;
    }
  }
 
  update() {
    var rotation = (this.ship.rotation - (Phaser.Math.PI2 / 4));
    if (this.key_left.isDown) {
      this.ship.body.angularVelocity = -200;
    } else if (this.key_right.isDown) {
      this.ship.body.angularVelocity = 200;
    } else {
      this.ship.body.angularVelocity = 0;
    }
    if (this.key_thrust.isDown) {
      this.game.physics.arcade.accelerationFromRotation(rotation, 300, this.ship.body.acceleration);
    } else if(this.key_reverse.isDown){
      this.game.physics.arcade.accelerationFromRotation(-1*rotation, 300, this.ship.body.acceleration);
    }else if (this.key_fire.isDown){
      this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.bulletGroup.fireFrom.setTo(this.ship.x,this.ship.y,1,1);  
      this.bulletGroup.fireRate = 100;
      this.bulletGroup.fireAngle = Phaser.Math.radToDeg(rotation);
      this.bulletGroup.fire();      
    }
    else {
      this.ship.body.acceleration.set(0);
    }
    this.checkBoundary();
  }

  render() {
    // this.game.debug.inputInfo(10,20);
  }

 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    this.game = new SimpleGame()
  }
  title = 'app';
  game: SimpleGame;
}
