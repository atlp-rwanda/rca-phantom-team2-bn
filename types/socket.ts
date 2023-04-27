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
    status: string;
    voidseats: number;
}