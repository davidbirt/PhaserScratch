/// <reference path="../services/phaser.d.ts" />
import { GameObject } from './gameEntity';
import { GUNS } from './weapon';
import { Gun } from './weapon';


export class Ship  extends GameObject{
    constructor(game : Phaser.Game) {
        super(game);
        // so what oes into setting up a ship
        this.instance = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        
        // setup the guns
        this.initShip();
        
        this.ChangeGuns(1);
        this.ammoPool = 200;
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
        this.machineGun = this.game.add.weapon( GUNS[0].fireRate, GUNS[0].spriteName);
        GUNS[0].weapon = this.machineGun;
        this.lasers =  this.game.add.weapon(GUNS[1].fireRate, GUNS[1].spriteName);
        GUNS[1].weapon = this.lasers;
        this.torpedos =  this.game.add.weapon(GUNS[2].fireRate, GUNS[2].spriteName);
        GUNS[2].weapon = this.torpedos;
        
    
        this.gunfire = this.game.add.audio('gunShot',0.03);
        this.guns = GUNS[0];
        this.guns.weapon.fireLimit = 5;
        
        //lifecycle events
        this.guns.weapon.onFireLimit.add(
          () =>{
            this.game.time.events.add(500,() =>{
              this.guns.weapon.resetShots();
            })
          },this
        )
        // init code
        this.guns.weapon.bulletInheritSpriteSpeed = true;
        this.guns.weapon.bulletCollideWorldBounds
        this.guns.weapon.bulletKillDistance = this.guns.bulletKillDistance;
        this.guns.weapon.bulletSpeed = this.guns.bulletSpeed;
        this.guns.weapon.bulletAngleVariance = this.guns.bulletAngleVariance;
    }

    /** Init weapon system */
    FireGuns(){
        this.guns.weapon.fireFrom.setTo(this.instance.x,this.instance.y,1,1);  
        this.guns.fireRate = this.guns.weapon.fireRate;
        this.guns.weapon.fireAngle = Phaser.Math.radToDeg(this.rotation); 
        if(this.ammoPool > this.guns.ammoCost || this.guns.ammoCost === 0) {
            this.ammoPool -= this.guns.ammoCost;
            this.guns.weapon.fire();
        }   

        if(!this.gunfire.isPlaying)
            this.gunfire.play();
    } 

    ChangeGuns(id: number){
        this.guns = GUNS.find(e => e.id === id);
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