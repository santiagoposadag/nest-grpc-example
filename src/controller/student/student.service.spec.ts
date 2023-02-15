import { ClientGrpcProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { studentMock, studentsMock } from '../../utils/mocks/student.mock';
import { StudentId, StudentService } from '../../interfaces/student.interfaces';
import { StudentServieNormalMock } from '../../utils/mocks/StudentServiceNormal.mock';
import { StudentServiceNormal } from './student.service';

describe('StudentServiceNormal', () => {
  let service: StudentServiceNormal;

  beforeEach(async () => {
    //Arange
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentServiceNormal],
    }).compile();

    service = module.get<StudentServiceNormal>(StudentServiceNormal);

    const grpcProxyBody = {
      protoPath: 'Protos/Students.proto',
      package: 'students',
      loader: {
        keepCase: true,
        longs: String,
        enums: Number,
        defaults: true,
        oneofs: true,
        includeDirs: ['src/'],
      },
    };

    service.grpcStudentsClient = new ClientGrpcProxy(grpcProxyBody)
    let mockStudentService = jest.spyOn(
      service.grpcStudentsClient,
      'getService'
    )

    mockStudentService.mockImplementation(()=> {
      return {
        FindStudentById:(studentId:StudentId)=> {
          return of(studentMock)
        },
        FindAllStudents:()=> {
          return of(studentsMock)
        },
        SaveAllStudents:(studentId:StudentId)=> {
        }
      }
    });

    service.grpcStudentsService = service.grpcStudentsClient.getService<StudentService>('StudentService')
  });

  it('should be defined', () => {

    //Act
    expect(service)
    //Assert
    .toBeDefined();
  });

  it('should return a student', (done)=> {
    //Act
    const observable = service.findStudentById(111)
    observable.subscribe({
      next: (result) => {
        //Assert
        expect(result).toBe(studentMock)
      },
      complete: () => {
        setTimeout(() => done(), 100)
      },
      error: (error) => {
        done(error)
      }
    })
    
  })
});
