/// <reference path="../services/phaser.d.ts" />

export class Gun {
    id: number;
    ammoCost: number;
    damage: number;
    name: string;
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
        fireRate: 25,
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
        fireRate: 10,
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
        fireRate: 2,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 6,
        bulletSpeed: 1250,
        bulletAngleVariance: 0
    }
]

