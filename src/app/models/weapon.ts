/// <reference path="../services/phaser.d.ts" />

export class Gun {
    id: number;
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
        name: 'photon',
        spriteName: 'photon',
        fireRate: 2,
        bulletCollideWorldBounds: false,
        bulletKillDistance: 6,
        bulletSpeed: 1250,
        bulletAngleVariance: 0
    }
]

