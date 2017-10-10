import { GameLevel } from './level';

export class GameSettings {constructor(){ }
    // Asteroid settings
    startingAsteroids:number = 4;
    maxAsteroids:number = 20;
    incrementAsteroids:number = 2;
    asteroidLarge : { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroidLarge', pieces: 3 }
    asteroidMed :   { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroidMedium', pieces: 2 }
    asteroidSmall : { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroidSmall' }

    // Levels
    levels: GameLevel[] = [
        { asteroid: 'asteroidLarge', count: 3 , id : 1},
        { asteroid: 'asteroidMed', count: 3, id : 2 },
        { asteroid: 'asteroidSmall', count: 3, id : 3 }
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