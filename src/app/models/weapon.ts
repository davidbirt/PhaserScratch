/// <reference path="../services/phaser.d.ts" />

export class Gun {
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
    
};

export const GUNS: Gun[] = [
    {
        id: 1,
        ammoCost: 0,
        damage: 1,
        name: 'machineGun',
        spriteName: 'bullet',
        soundName: 'bullet',
        fireRate: 200,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 2,
        bulletSpeed: 500,
        bulletAngleVariance: 10
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
        bulletAngleVariance: 1

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
        bulletAngleVariance: 0
    }
]

