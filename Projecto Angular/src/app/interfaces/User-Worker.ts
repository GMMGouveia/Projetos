
export interface UserWorkerDTO {
    id: number;
    email: string | undefined;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    shifts: ShiftDTO [],
    role: string;
    
}

export interface ShiftDTO {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    pricePerHour: number;
    place: string;
    name: string;
    comments: string;
    totalProfit?: number;
    userWorkerId: number;
}