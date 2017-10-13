/// <reference path="../services/phaser.d.ts" />
export class Gun{
    id: number;
    ammoCost: number;
    damage: number;
    name: string;
    soundName: string;
    spriteName: string;
    fireRate: number;
    bulletCollideWorldBounds: boolean;
    bulletKillDistance: number;
    bulletSpeed: number;
    bulletAngleVariance: number;
    weapon: Phaser.Weapon
};

export const GUNS: Gun[] = [
    {
        id:1,
        ammoCost: 0,
        damage: 1,
        name: 'machineGun',
        spriteName: 'bullet',
        soundName: 'bullet',
        fireRate: 60,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 2,
        bulletSpeed: 500,
        bulletAngleVariance: 5,
        weapon:null
       
    },
    {
        id: 2,
        ammoCost: 1,
        damage: 3, 
        name: 'laser',
        spriteName: 'laser',
        soundName: 'laser',
        fireRate: 150,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 4,
        bulletSpeed: 750,
        bulletAngleVariance: 1,
        weapon:null
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
        weapon: null
    }
]

