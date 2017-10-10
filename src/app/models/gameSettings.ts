import { GameRule } from './level';
import { Asteroid } from './asteroid';

export class GameSettings {constructor(){ }
    // Asteroid settings
    startingAsteroids:number = 4;
    maxAsteroids:number = 20;
    incrementAsteroids:number = 2;
    asteroidLarge = <Asteroid> { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, spriteName: 'asteroidLarge', nextSize: 'asteroidMed',  pieces: 2 };
    asteroidMed = <Asteroid>  { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, spriteName: 'asteroidMed', nextSize: 'asteroidSmall', pieces: 3 };
    asteroidSmall = <Asteroid> { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, spriteName: 'asteroidSmall' };

    // Levels
    levels: any[] = [
        {
            Rules: GameRule[3] = [
                new GameRule(this.asteroidLarge, 2, 1),
                new GameRule(this.asteroidMed, 3, 2),
                new GameRule(this.asteroidSmall, 3, 3),
            ]
        }
    ];


    // Ship Settings
    startX: number;
    startY: number;
    acceleration: number = 300;
    drag: number = 100;
    maxVelocity: number = 300;
    angularVelocity: number = 200;
    startingLives: number = 3;
    timeToReset:number = 3;

    // Styles
    counterFontStyle:Phaser.PhaserTextStyle = {font: '40px Arial', fill: '#BC2119', align: 'center'};

}