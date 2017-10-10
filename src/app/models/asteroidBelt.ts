/// <reference path="../services/phaser.d.ts" />
import { GameObject } from './gameEntity';
import { GameSettings } from './gameSettings'
import { GameLevel } from './level'

export class AsteroidBelt extends GameObject{
    constructor(game : Phaser.Game ){ 
        super(game);
        this.list = this.game.add.group();
        this.list.enableBody = true;
        this.list.physicsBodyType = Phaser.Physics.ARCADE;
        this.settings = new GameSettings();
     }
    
    list:Phaser.Group;
    settings : GameSettings;

    buildAsteroids(level:GameLevel) {
        console.log(level);
        for (var i=0; i < level.count; i++ ) {
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
            
            var asteroid = this.list.create(x, y, level.asteroid);
            asteroid.anchor.set(0.5, 0.5);
            asteroid.body.angularVelocity = this.game.rnd.integerInRange(0, 200);
     
            var randomAngle = Phaser.Math.degToRad(this.game.rnd.angle());
            var randomVelocity = this.game.rnd.integerInRange(50, 150);
            this.game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
        }
    }
}