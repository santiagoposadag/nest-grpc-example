import { Body, Controller, Get, OnModuleInit, Param, Post, UseInterceptors } from '@nestjs/common';
import { Observable, ReplaySubject, map } from 'rxjs';
import { Student} from '../../interfaces/student.interfaces';
import { StudentServiceNormal } from './student.service';

@Controller('student')
export class StudentController {

  constructor(private service: StudentServiceNormal) {

  }

  @Get('get/all')
  getAllStudents() {
    return this.service.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: number): Observable<Student> {
    return this.service.findStudentById(id);
  }


  @Post()
  saveAllStudents(@Body() students: Student[]) {
    return this.service.saveAllStudents(students);
  }
}
