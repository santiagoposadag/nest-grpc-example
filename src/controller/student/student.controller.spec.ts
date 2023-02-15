import { Test, TestingModule } from '@nestjs/testing';
import { studentMock, studentsMock } from '../../utils/mocks/student.mock';
import { StudentServieNormalMock } from '../../utils/mocks/StudentServiceNormal.mock';
import { StudentController } from './student.controller';
import { StudentServiceNormal } from './student.service';

describe.only('StudentController', () => {
  let controller: StudentController;
  let service: StudentServiceNormal;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentServiceNormal,
        {
          provide: StudentServiceNormal,
          useClass: StudentServieNormalMock
        }
      ]
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentServiceNormal>(StudentServiceNormal);



  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a list of students', (done) => {
    jest.spyOn(service, 'getAllStudents')
    const observable = controller.getAllStudents()

    observable.subscribe({
      next: (result) => {
        expect(result).toBe(studentsMock)
      },
      complete: () => {
        done()
        //setTimeout(() => done(), 100)
      },
      error: (error) => {
        done(error)
      }
    })

    expect(service.getAllStudents).toHaveBeenCalledTimes(1)

  })

  it('should bring a student', (done) => {
    jest.spyOn(service, 'findStudentById')
    const observable = controller.getStudentById(111)
    observable.subscribe({
      next: (result) => {
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


  it('should execute the request to save', async () => {
    jest.spyOn(service, 'saveAllStudents')
    const response = await controller.saveAllStudents(studentsMock)
    expect(service.saveAllStudents).toHaveBeenCalledTimes(1)

  })
});
