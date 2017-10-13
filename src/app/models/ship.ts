/// <reference path="../services/phaser.d.ts" />
import { GameObject } from './gameEntity';
import { GUNS } from './weapon';
import { Gun } from './weapon';
import { GameSettings } from './gameSettings';


export class Ship  extends GameObject{
    constructor(game : Phaser.Game, settings: GameSettings) {
        super(game,settings);
        // so what oes into setting up a ship
        this.instance = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        
        // setup the guns
        this.initShip();
        this.ammoPool = 500;
    }

    /** PROPERTIES */
    instance : Phaser.Sprite;
    machineGun : Phaser.Weapon;
    lasers : Phaser.Weapon;
    torpedos : Phaser.Weapon;
    guns : Gun;
    ammoPool: number;
    lives : number = 3;
    invulnerable:boolean = false;
    gunfire : Phaser.Sound;

    get rotation():number{
        return (this.instance.rotation - (Phaser.Math.PI2 / 4));
    }

    /** METHODS */
    /** Called from the game class */
    render(key_left: Phaser.Key, key_right: Phaser.Key, key_thrust: Phaser.Key, key_reverse: Phaser.Key) {
        // Rotational movement
        if (key_left.isDown) {
            this.instance.body.angularVelocity = -220;
        } else if (key_right.isDown) {
            this.instance.body.angularVelocity = 220;
        } else {
            this.instance.body.angularVelocity = 0;
        }

        // Thrust and Brake
        if (key_thrust.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 400, this.instance.body.acceleration);
        } else if (key_reverse.isDown) {
            this.game.physics.arcade.accelerationFromRotation(-1 * this.rotation, 400, this.instance.body.acceleration);
        } else {
            this.instance.body.acceleration.set(0);
        }

        this.checkBoundary(this.instance);
    }

    /** Ship setup code */
    initShip(){
        this.instance.anchor.set(0.5, 0.5);
        this.instance.scale.setTo(0.1, 0.1);
        this.game.physics.enable(this.instance, Phaser.Physics.ARCADE);
        this.instance.body.drag.set(10);
        this.instance.body.maxVelocity.set(400);
        this.InitGuns();
    }

    InitGuns(){
        // setup all the weapons that this ship can use.
        for (var index = 0; index < GUNS.length; index++) {
            GUNS[index].weapon = this.game.add.weapon( GUNS[index].fireRate, GUNS[index].spriteName);
            GUNS[index].sound = this.game.add.audio(GUNS[index].soundName ,0.2);
            GUNS[index].weapon.index = index;
             //lifecycle events
             GUNS[index].weapon.onFireLimit.add(
                (wpn,limit) =>{
                  console.log(wpn + ' ' + limit);
                  this.game.time.events.add(500,() =>{
                    GUNS[wpn.index].weapon.resetShots();
                  })
                },this
              )
        }

        this.ChangeGuns(1);
        
        //lifecycle events
        this.guns.weapon.onFireLimit.add(
          () =>{
            this.game.time.events.add(500,() =>{
              this.guns.weapon.resetShots();
            })
          },this
        )
      
    }

    /** Init weapon system */
    FireGuns(){
        this.guns.weapon.fireFrom.setTo(this.instance.x,this.instance.y,1,1);  
        this.guns.fireRate = this.guns.weapon.fireRate;
        this.guns.weapon.fireAngle = Phaser.Math.radToDeg(this.rotation); 
        if(this.ammoPool > this.guns.ammoCost || this.guns.ammoCost === 0) {
            this.ammoPool -= this.guns.ammoCost;
            this.guns.weapon.fire();
            this.settings.updateHud.dispatch(this.ammoPool);
        }   

        if(!this.guns.sound.isPlaying)
            this.guns.sound.play();
    } 

    ChangeGuns(id: number){
        this.guns = GUNS.find(e => e.id === id);
        this.guns.weapon.fireLimit = this.guns.fireLimit;

        // init code
        this.guns.weapon.bulletInheritSpriteSpeed = true;
        this.guns.weapon.bulletCollideWorldBounds = false
        this.guns.weapon.bulletKillDistance = this.guns.bulletKillDistance;
        this.guns.weapon.bulletSpeed = this.guns.bulletSpeed;
        this.guns.weapon.bulletAngleVariance = this.guns.bulletAngleVariance;
    }


    DestroyShip(){
        this.lives--;
        // meed to be impervious to collisions for a cpl seconds/
        this.invulnerable = true;
        if(this.lives > 0){
            this.game.time.events.add(Phaser.Timer.SECOND * this.settings.timeToReset, () => {
                this.instance.reset(this.game.width /2,this.game.height /2);
                this.game.time.events.repeat(Phaser.Timer.SECOND * this.settings.blinkdelay, this.settings.timeToReset/this.settings.blinkdelay,() => {
                    this.instance.visible = !this.instance.visible;
                    if(!this.invulnerable && !this.instance.visible)
                        this.instance.visible = true;
                },this)

                this.game.time.events.add((Phaser.Timer.SECOND * this.settings.timeToReset) + 0.3, () => { 
                    this.invulnerable = false;
                    this.instance.visible = true;
                }, this)
            },this);

            
        }
        return this.lives;
    }
}