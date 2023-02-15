import { Observable, of } from "rxjs";
import { Student } from "src/interfaces/student.interfaces";
import { studentMock, studentsMock } from "./student.mock";

export class StudentServieNormalMock{
    getAllStudents(): Observable<Student[]> {
        return of(studentsMock)
    }

    findStudentById(id: number): Observable<Student> {
        return of(studentMock)
    }

    saveAllStudents(students: Student[]) {
        return {}
    }
}