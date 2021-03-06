/// <reference path="./services/phaser.d.ts" />
import { Component } from '@angular/core';
import { Ship } from './models/ship';
import { GameSettings } from './models/gameSettings';
import { AsteroidBelt } from './models/asteroidBelt';
import { GameRule } from './models/level';
import { GUNS } from './models/weapon';

class SimpleGame {
  constructor() {
    this.game = new Phaser.Game(1200, 780, Phaser.AUTO, 'content', { 
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
  key_laser: Phaser.Key;
  key_machineGun: Phaser.Key;
  key_photon: Phaser.Key;
  bulletGroup: Phaser.Weapon;
  settings : GameSettings;
  hud: Phaser.Text;
  bg1: Phaser.Sprite;
  bg2: Phaser.Sprite;
  gunfire : Phaser.Sound;
  bg3: Phaser.Sprite;
  level: number;

  preload() {
    this.game.load.image('bg', '../assets/bg8.jpg');
    this.game.load.image('bg2', '../assets/bg7.jpg');
    this.game.load.image('bg3', '../assets/bg6.jpg');
    this.game.load.image('asteroidLarge', '../assets/asteroids/ast_lrg.png');
    this.game.load.image('asteroidMed', '../assets/asteroids/ast_med.png');
    this.game.load.image('asteroidSmall', '../assets/asteroids/ast_sml.png');
    this.game.load.image('bullet', '../assets/bullets/bullet.png');
    this.game.load.image('ship', '../assets/ship2.png');
    this.game.load.image('laser', '../assets/bullets/lazer.png');
    this.game.load.image('photon', '../assets/bullets/photon.png');
    this.game.load.audio('bullet', '../assets/sounds/bullet.mp3');
    this.game.load.audio('machineGun', '../assets/sounds/machine-gun.wav');
    this.game.load.audio('gunShot', '../assets/sounds/MP5.wav');
    this.game.load.audio('lasers', '../assets/sounds/Hyperion.wav');
    this.game.load.audio('photon', '../assets/sounds/photon.wav');
  }


  create() {
    this.level = 0;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.settings = new GameSettings();

    // just seeing if we can use a signal for something.
    this.settings.updateHud = new Phaser.Signal()
    this.settings.updateHud.add(function(){
      this.hud.text = 'Lives: ' + this.ship.lives.toString() + '| AMMO: ' + this.ship.ammoPool.toString();
    },this);

    // setup the background
    this.bg3 = this.game.add.sprite(0, 0, 'bg3');
    this.bg2 = this.game.add.sprite(0, 0, 'bg2');
    this.bg1 = this.game.add.sprite(0, 0, 'bg');
    
     this.settings.levels[0].bg = this.bg1;
     this.settings.levels[1].bg = this.bg2;
     this.settings.levels[2].bg = this.bg3;

    // setup the ship and its physics
    this.ship = new Ship(this.game, this.settings);
    
    // setup user input
    this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.key_machineGun = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key_laser = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.key_photon = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    
     // Add asteroids group to the game world.
     this.asteroids = new AsteroidBelt(this.game, this.settings);
     this.asteroids.buildAsteroids(this.settings.levels[this.level]);

     // Add hud display to the game world.
     this.hud = this.game.add.text(20,10, 'Lives: ' + this.ship.lives.toString() + '| AMMO: ' + this.ship.ammoPool.toString(), this.settings.counterFontStyle);
  }

  update() {
    if (this.key_fire.isDown)this.ship.FireGuns();
    if(this.key_machineGun.isDown)this.ship.ChangeGuns(1);
    if(this.key_laser.isDown)this.ship.ChangeGuns(2);
    if(this.key_photon.isDown)this.ship.ChangeGuns(3);
    this.ship.render(this.key_left, this.key_right, this.key_thrust, this.key_reverse);

    // check boundary for the asteroids
    this.asteroids.list.forEachExists(this.ship.checkBoundary, this);
    if(this.ship.guns.continuous)this.ship.guns.weapon.bullets.forEachExists(this.ship.checkBoundary, this);


    this.game.physics.arcade.overlap(this.ship.guns.weapon.bullets, this.asteroids.list, this.collide, null, this);
    if(!this.ship.invulnerable)this.game.physics.arcade.overlap(this.ship.instance, this.asteroids.list, this.collide, null, this);
  }


  collide(target: any, asteroid: any) {
    target.kill();
    asteroid.kill();

    if (target.key == 'ship') {
      this.ship.DestroyShip();
      this.hud.text = 'Lives: ' + this.ship.lives.toString() + '| AMMO: ' + this.ship.ammoPool.toString();
    } else {
      //if its an asteroid that was destroyed then we need to check and see if its time to level up!
      // does this asteroid have pieces?
      asteroid.kill();
      if (this.asteroids.list.children.filter(ass => (<Phaser.Sprite>ass).alive).length == 0) {
        this.settings.levels[this.level].bg.kill();
        this.level++;
        this.game.time.events.add(3,()=>{
          this.settings.levels[this.level].Rules.forEach(element => {
            for (var index = 0; index < element.count; index++) {
              this.asteroids.createAsteroid(asteroid.x, asteroid.y, element.asteroid.spriteName);
            }
          });
        },this)

      } else {
        if (this.asteroids.settings[asteroid.key].nextSize) {
          // then find the GameRule that corresponds to that Asteroid type on this level and call the belt to build out those asteroids
          var rule = this.settings.levels[this.level].Rules.find(r => r.asteroid.spriteName == asteroid.key)
          if (rule) {
            for (var index = 0; index < rule.asteroid.pieces; index++) {
              this.asteroids.createAsteroid(asteroid.x, asteroid.y, rule.asteroid.nextSize);
            }
          }
        }
      }
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
