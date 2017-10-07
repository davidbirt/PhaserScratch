/// <reference path="../services/phaser.d.ts" />

class ShipSettings {
    startX: number;
    startY: number;
    acceleration: number = 300;
    drag: number = 100;
    maxVelocity: number = 300;
    angularVelocity: number = 200;
}

export class Ship {
    constructor(game : Phaser.Game) {
        // so what oes into setting up a ship
        this.game = game;
        this.instance = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.settings = new ShipSettings();
        this.initShip();
    }

    /** PROPERTIES */
    instance : Phaser.Sprite;
    game : Phaser.Game;
    settings : ShipSettings;

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
        this.checkBoundary();
    }

    /**
     * calculage the game boundary and ensure the ship is staying inside of it.
     */
    checkBoundary() {
        if (this.instance.x < 0) {
          this.instance.x = this.game.width;
        } else if (this.instance.x > this.game.width) {
          this.instance.x = 0;
        }
    
        if (this.instance.y < 0) {
          this.instance.y = this.game.height;
        } else if (this.instance.y > this.game.height) {
          this.instance.y = 0;
        }
    }

    /** Ship setup code */
    initShip(){
        this.instance.anchor.set(0.5, 0.5);
        this.game.physics.enable(this.instance, Phaser.Physics.ARCADE);
        this.instance.body.drag.set(100);
        this.instance.body.maxVelocity.set(300);
    }
      
}