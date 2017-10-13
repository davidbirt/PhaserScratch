/// <reference path="../services/phaser.d.ts" />
export class Gun{
    id: number;
    ammoCost: number;
    damage: number;
    name: string;
    sound : Phaser.Sound;
    soundName: string;
    spriteName: string;
    fireRate: number;
    bulletCollideWorldBounds: boolean;
    bulletKillDistance: number;
    bulletSpeed: number;
    bulletAngleVariance: number;
    weapon: Phaser.Weapon;
    fireLimit: number;
    continuous:boolean
};

export const GUNS: Gun[] = [
    {
        id:1,
        ammoCost: 0,
        damage: 1,
        name: 'machineGun',
        spriteName: 'bullet',
        soundName: 'gunShot',
        fireRate: 60,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 2,
        bulletSpeed: 500,
        bulletAngleVariance: 5,
        weapon:null,
        sound : null,
        fireLimit : 5,
        continuous : false
    },
    {
        id: 2,
        ammoCost: 1,
        damage: 3, 
        name: 'laser',
        spriteName: 'laser',
        soundName: 'lasers',
        fireRate: 150,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 4,
        bulletSpeed: 750,
        bulletAngleVariance: 1,
        weapon:null,
        sound : null,
        fireLimit : 6,
        continuous: false
    },
    {
        id: 3,
        ammoCost: 3,
        damage: 7,
        name: 'photon',
        spriteName: 'photon',
        soundName: 'photon',
        fireRate: 300,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 6,
        bulletSpeed: 1250,
        bulletAngleVariance: 0,
        weapon: null,
        sound : null,
        fireLimit: 1,
        continuous : true        
    }
]

