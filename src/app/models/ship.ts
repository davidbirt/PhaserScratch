/// <reference path="../services/phaser.d.ts" />
import { GameObject } from './gameEntity';

export class Ship  extends GameObject{
    constructor(game : Phaser.Game) {
        super(game);
        // so what oes into setting up a ship
        this.instance = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.initShip();

        // setup the guns
        this.guns = this.game.add.weapon(50, 'bullet');
    }

    /** PROPERTIES */
    instance : Phaser.Sprite;
    guns : Phaser.Weapon;
    lives : number = 3;
    get rotation():number{
        return (this.instance.rotation - (Phaser.Math.PI2 / 4));
    }

    /** METHODS */
    /** Called from the game class */
    render(key_left: Phaser.Key, key_right: Phaser.Key, key_thrust: Phaser.Key, key_reverse: Phaser.Key) {
        // Rotational movement
        if (key_left.isDown) {
            this.instance.body.angularVelocity = -200;
        } else if (key_right.isDown) {
            this.instance.body.angularVelocity = 200;
        } else {
            this.instance.body.angularVelocity = 0;
        }

        // Thrust and Brake
        if (key_thrust.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 350, this.instance.body.acceleration);
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
        this.game.physics.enable(this.instance, Phaser.Physics.ARCADE);
        this.instance.body.drag.set(100);
        this.instance.body.maxVelocity.set(300);
    }

    /** Init weapon system */
    FireGuns(){
        this.guns.fireFrom.setTo(this.instance.x,this.instance.y,1,1);  
        this.guns.fireRate = 90;
        this.guns.fireAngle = Phaser.Math.radToDeg(this.rotation);        
        this.guns.fire();  
    }

    DestroyShip(){
        this.lives--;
        if(this.lives > 0){
            console.log('decrimenting lives counter');
            this.game.time.events.add(Phaser.Timer.SECOND * this.settings.timeToReset, () => {
                this.instance.reset(this.game.width /2,this.game.height /2);
            },this);
        }
    }
}