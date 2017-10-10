import {Asteroid} from './asteroid';

export class GameRule{
    constructor(asteroid : Asteroid, count : number, id : number){
        this.asteroid = asteroid;
        this.count = count;
    };
    asteroid : Asteroid;
    count : number;
    id : number;
}