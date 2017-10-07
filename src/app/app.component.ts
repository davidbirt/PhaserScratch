/// <reference path="./services/phaser.d.ts" />
import { Component } from '@angular/core';
import { Ship } from './models/ship';

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
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { 
      preload: this.preload, 
      create: this.create, 
      update: this.update, 
      render: this.render, 
      resetAsteroids : this.resetAsteroids });
    this.bulletInterval = 0;
  }

  game: Phaser.Game;
  ship: Ship;
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
    this.game.load.image('bullet', '../assets/bullets/bullet.png');
    this.game.load.image('ship', '../assets/ship.png');
  }

  resetAsteroids() {
    for (var i=0; i < 30; i++ ) {
        var side = Math.round(Math.random());
        var x;
        var y;
        
        if (side) {
            x = Math.round(Math.random()) * this.game.width;
            y = Math.random() * this.game.height;
        } else {
            x = Math.random() * this.game.width;
            y = Math.round(Math.random()) * this.game.height;
        }
        
        var asteroid = this.asteroids.create(x, y, 'asteroid');
        asteroid.anchor.set(0.5, 0.5);
        asteroid.body.angularVelocity = this.game.rnd.integerInRange(0, 200);
 
        var randomAngle = Phaser.Math.degToRad(this.game.rnd.angle());
        var randomVelocity = this.game.rnd.integerInRange(50, 150);
        this.game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
    }
  }
  
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // setup the background
    this.game.add.sprite(0, 0, 'bg');

    // setup the ship and its physics
    this.ship = new Ship(this.game);
    
    // need a group for the bullets
    this.bulletGroup = this.game.add.weapon(30,'bullet');
    
    // setup user input
    this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

     // Add asteroids group to the game world.
     this.asteroids = this.game.add.group();
     this.asteroids.enableBody = true;
     this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
     this.resetAsteroids();
  }

  update() {
    if (this.key_fire.isDown){
         this.ship.FireGuns();
    }
    this.ship.render(this.key_left,this.key_right,this.key_thrust,this.key_reverse);
    
    // check boundary for the asteroids
    this.asteroids.forEachExists(this.ship.checkBoundary, this);
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
