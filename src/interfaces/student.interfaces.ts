import { Observable } from "rxjs";

export interface StudentService{
    FindStudentById(studentId:StudentId):Observable<Student>;

    FindAllStudents():Observable<Student>;

    SaveAllStudents(students:Observable<Student>);

    LookIfExists(students:Observable<Student>):Observable<Acknowledge>
}



export interface StudentId{
    id:number;
}
export interface Student{
    id:number;
    name:string;
}
export interface Acknowledge{
    id:number;
    exists:boolean;
}