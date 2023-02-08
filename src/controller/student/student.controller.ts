import { Body, Controller, Get, OnModuleInit, Param, Post, UseInterceptors } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, map } from 'rxjs';
import { ControladorInterceptor } from 'src/controllador.interceptor';
import { GrpcClienteOpciones } from 'src/grpc-client.options';
import { Student, StudentService } from 'src/interfaces/student.interfaces';

@Controller('student')
@UseInterceptors(new ControladorInterceptor())
export class StudentController implements OnModuleInit{

    @Client(
        GrpcClienteOpciones.crearOpciones(
          'localhost:6565',
          'students',
          './Protos/Students.proto',
        ),
      )
      grpcStudentsClient: ClientGrpc;
      grpcStudentsService: StudentService;
    
    
    
      constructor() {}
    
      onModuleInit() {
        this.grpcStudentsService = this.grpcStudentsClient.getService('StudentService')
      }

      @Get('get/all')
      getAllStudents(){
        const response:Student[] = []
        return this.grpcStudentsService.FindAllStudents().pipe(map(student => {
            response.push(student)
            return response
        }));
      }
    
      @Get(':id')
      getHello(@Param('id') id:number): Observable<Student> {
        return this.grpcStudentsService.FindStudentById({id});
      }


      @Post()
      saveAllStudents(@Body() students:Student[]){
        const requestObservable = new ReplaySubject<Student>();

        students.forEach(student => {
            requestObservable.next(student)
        })
        requestObservable.complete();

        return this.grpcStudentsService.SaveAllStudents(requestObservable);
      }
}
