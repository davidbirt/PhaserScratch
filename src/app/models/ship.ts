/// <reference path="../services/phaser.d.ts" />
import { GameObject } from './gameEntity';
import { GUNS } from './weapon';
import { Gun } from './weapon';


export class Ship extends GameObject {
    constructor(game: Phaser.Game) {
        super(game);
        // so what oes into setting up a ship
        this.instance = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.initShip();

        // setup the guns
        this.ChangeGuns(1);
        this.ammoPool = 200;

    }



    /** PROPERTIES */
    instance: Phaser.Sprite;
    guns: Phaser.Weapon;
    weapon: Gun;
    ammoPool: number;
    lives: number = 3;
    invulnerable: boolean = false;

    get rotation(): number {
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
    initShip() {
        this.instance.anchor.set(0.5, 0.5);
        this.game.physics.enable(this.instance, Phaser.Physics.ARCADE);
        this.instance.body.drag.set(100);
        this.instance.body.maxVelocity.set(300);
    }

    /** Init weapon system */
    FireGuns() {
        this.ammoPool -= this.weapon.ammoCost;
        this.guns.fireFrom.setTo(this.instance.x, this.instance.y, 1, 1);
        this.guns.fireRate = 90;
        this.guns.fireAngle = Phaser.Math.radToDeg(this.rotation);
        if (this.ammoPool > this.weapon.ammoCost || this.weapon.ammoCost === 0) this.guns.fire();
    }

    ChangeGuns(id: number) {
        var gunInfo = GUNS.find(e => e.id === id);
        this.weapon = gunInfo;
        this.guns = this.game.add.weapon(gunInfo.fireRate, gunInfo.spriteName);
        this.guns.bulletCollideWorldBounds = gunInfo.bulletCollideWorldBounds;
        this.guns.bulletKillDistance = gunInfo.bulletKillDistance;
        this.guns.bulletSpeed = gunInfo.bulletSpeed;
        this.guns.bulletAngleVariance = gunInfo.bulletAngleVariance;
    }


    DestroyShip() {
        this.lives--;
        // meed to be impervious to collisions for a cpl seconds/
        this.invulnerable = true;
        if (this.lives > 0) {
            this.game.time.events.add(Phaser.Timer.SECOND * this.settings.timeToReset, () => {
                this.instance.reset(this.game.width / 2, this.game.height / 2);
                this.game.time.events.repeat(Phaser.Timer.SECOND * this.settings.blinkdelay, this.settings.timeToReset / this.settings.blinkdelay, () => {
                    this.instance.visible = !this.instance.visible;
                    if (!this.invulnerable && !this.instance.visible)
                        this.instance.visible = true;
                }, this)

                this.game.time.events.add((Phaser.Timer.SECOND * this.settings.timeToReset) + 0.3, () => {
                    this.invulnerable = false;
                    this.instance.visible = true;
                }, this)
            }, this);


        }
    }
}