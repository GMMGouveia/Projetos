import { StudentDTO } from './Student';
import { TeacherDTO } from './Teacher';


export interface ClassDTO{
    _id?:string;
    name:string;
    year:number;
    students:StudentDTO[] | string[];
    teachers:TeacherDTO[] | string[];

}