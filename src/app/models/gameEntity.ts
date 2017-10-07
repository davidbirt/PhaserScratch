/// <reference path="../services/phaser.d.ts" />

export class GameObject{
    constructor(game: Phaser.Game){
        this.game = game;
    }

    game: Phaser.Game;
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