import { BusSpeed, BusStatus } from "../src/enums/bus.enums"

export interface LocationChange {
    busId: string;
    busType: string;
    latitude: number;
    longitude: number;
}

export interface CommuterChange{
    busId: string;
    busType: string;
    alighted: number;
    aboarded: number;
}

export interface StatusChange{
    busId: string;
    busType: string;
    status: BusStatus;
    voidseats: number;
    speed: number; // km/h
}
export interface SpeedChange{
    busId: string;
    busType: string;
    theChange: BusSpeed;
    speed:number;
}