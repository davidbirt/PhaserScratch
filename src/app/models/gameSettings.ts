export class GameSettings {
    // Asteroid settings
    startingAsteroids:number = 4;
    maxAsteroids:number = 20;
    incrementAsteroids:number = 2;
    asteroidLarge : { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroidl' }
    asteroidMed :   { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroidm' }
    asteroidSmall : { minVelocity : 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: 'asteroids' }

    // Ship Settings
    startX: number;
    startY: number;
    acceleration: number = 300;
    drag: number = 100;
    maxVelocity: number = 300;
    angularVelocity: number = 200;
}