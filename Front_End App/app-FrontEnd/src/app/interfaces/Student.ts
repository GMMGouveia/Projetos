import { TutorDTO } from "./Tutor";

export interface StudentDTO{
    _id:string;
    firstName:string;
    lastName:string;
    birthDate:Date;
    tutor:TutorDTO | string;
}