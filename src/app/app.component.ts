/// <reference path="./services/phaser.d.ts" />
import { Component } from '@angular/core';
import { Ship } from './models/ship';
import { GameSettings } from './models/gameSettings';
import { AsteroidBelt } from './models/asteroidBelt';

class SimpleGame {
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { 
      preload: this.preload, 
      create: this.create, 
      update: this.update, 
      render: this.render,
      collide : this.collide});
  }

  game: Phaser.Game;
  ship: Ship;
  asteroids: AsteroidBelt;
  key_left: Phaser.Key;
  key_right: Phaser.Key;
  key_thrust: Phaser.Key;
  key_reverse: Phaser.Key;
  key_fire : Phaser.Key;
  bulletGroup: Phaser.Weapon;
  settings : GameSettings;
  hud: any;

  preload() {
    this.game.load.image('bg', '../assets/bg2.jpg');
    this.game.load.image('asteroidl', '../assets/asteroids/ast_lrg.png');
    this.game.load.image('asteroidm', '../assets/asteroids/ast_med.png');
    this.game.load.image('asteroids', '../assets/asteroids/ast_sml.png');
    this.game.load.image('bullet', '../assets/bullets/bullet.png');
    this.game.load.image('ship', '../assets/ship.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.settings = new GameSettings();
    
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
     this.asteroids = new AsteroidBelt(this.game);
     this.asteroids.buildAsteroids();

     // Add hud display to the game world.
     this.hud = this.game.add.text(20,10, this.ship.lives.toString(), this.settings.counterFontStyle);
  }

  update() {
    if (this.key_fire.isDown){
         this.ship.FireGuns();
    }
    this.ship.render(this.key_left,this.key_right,this.key_thrust,this.key_reverse);
    
    // check boundary for the asteroids
    this.asteroids.list.forEachExists(this.ship.checkBoundary, this);

    this.game.physics.arcade.overlap(this.ship.guns.bullets, this.asteroids.list, this.collide, null,this);
    this.game.physics.arcade.overlap(this.ship.instance, this.asteroids.list, this.collide, null,this);
  }

  collide(target: any, asteroid : any){
    target.kill();
    asteroid.kill();

    if(target.key == 'ship'){
      this.ship.DestroyShip();
      this.hud = this.ship.lives;
    }
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
