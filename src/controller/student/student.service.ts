import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, map } from 'rxjs';
import { GrpcClienteOpciones } from '../../grpc-client.options';
import { Student, StudentService } from '../../interfaces/student.interfaces';

@Injectable()
export class StudentServiceNormal implements OnModuleInit {

    @Client(
        GrpcClienteOpciones.crearOpciones(
            'localhost:6565',
            'students',
            './Protos/Students.proto',
        ),
    )
    grpcStudentsClient: ClientGrpc;


    grpcStudentsService: StudentService;

    onModuleInit() {
        this.grpcStudentsService = this.grpcStudentsClient.getService('StudentService')
    }


    getAllStudents(): Observable<Student[]> {
        const response:Student[] = []
        return this.grpcStudentsService.FindAllStudents().pipe(map(student => {
            response.push(student)
            return response
        }))
    }

    findStudentById(id: number): Observable<Student> {
        return this.grpcStudentsService.FindStudentById({id});
    }

    saveAllStudents(students: Student[]) {
        const requestObservable = new ReplaySubject<Student>();

        students.forEach(student => {
            requestObservable.next(student)
        })
        requestObservable.complete();

        return this.grpcStudentsService.SaveAllStudents(requestObservable);
    }
}
