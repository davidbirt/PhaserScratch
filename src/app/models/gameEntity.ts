/// <reference path="../services/phaser.d.ts" />
import { GameSettings } from './gameSettings';

export class GameObject{
    constructor(game: Phaser.Game){
        this.game = game;
        this.settings = new GameSettings();
    }

    game: Phaser.Game;
    settings : GameSettings;

    checkBoundary(instance : Phaser.Sprite) {
        if (instance.x < 0) {
          instance.x = this.game.width;
        } else if (instance.x > this.game.width) {
          instance.x = 0;
        }
    
        if (instance.y < 0) {
          instance.y = this.game.height;
        } else if (instance.y > this.game.height) {
          instance.y = 0;
        }
    }
}