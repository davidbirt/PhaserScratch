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
     private _levels: any[] =  [
        {
            Rules: GameRule[3] = [
                new GameRule(this.asteroidLarge, 0, 1),
                new GameRule(this.asteroidMed, 0, 2),
                new GameRule(this.asteroidSmall, 1, 3),
            ],
            bg: Phaser.Sprite,
            id: 1
        },
        {
            Rules: GameRule[3] = [
                new GameRule(this.asteroidLarge, 3, 1),
                new GameRule(this.asteroidMed, 5, 2),
                new GameRule(this.asteroidSmall, 1, 3),
            ],
            bg: Phaser.Sprite,
            id: 2
        }
    ];
    
    public get levels() : any[] {
        return this._levels;
    }
    
    public set levels(v : any[]) {
        this._levels = v;
    }

    // Ship Settings
    startX: number;
    startY: number;
    acceleration: number = 300;
    drag: number = 100;
    maxVelocity: number = 300;
    angularVelocity: number = 200;
    startingLives: number = 3;
    timeToReset:number = 3;
    blinkdelay:number = 0.2

    // Styles
    counterFontStyle:Phaser.PhaserTextStyle = {font: '40px Arial', fill: '#BC2119', align: 'center'};

}