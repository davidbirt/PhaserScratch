/// <reference path="./services/phaser.d.ts" />
import { Component } from '@angular/core';

class SimpleGame {
      constructor() {
          this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render });
      }
  
      game: Phaser.Game;
      sprite : Phaser.Sprite;

      preload() {
          this.game.load.image('logo', '../assets/phaser-logo-small.png');
      }

      create() {
          this.game.physics.startSystem(Phaser.Physics.ARCADE)
          this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
          this.sprite.scale.setTo(0.2,0.2);
          this.game.add.tween(this.sprite.scale).to({x:0.5,y:0.5},2000,Phaser.Easing.Bounce.Out,true);
          this.game.physics.enable(this.sprite)
      }

      update(){
         if(this.game.physics.arcade.distanceToPointer(this.sprite,this.game.input.activePointer) > 8){
           this.game.physics.arcade.moveToPointer(this.sprite,300);
         }else{
           this.sprite.body.velocity.set(0);
         }
      }

      render(){
        this.game.debug.inputInfo(10,20);
      }
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    this.game = new SimpleGame()
  }
  title = 'app';
  game : SimpleGame;
}
