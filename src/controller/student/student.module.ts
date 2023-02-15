import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentServiceNormal } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentServiceNormal]
})
export class StudentModule {}
