import { Module } from '@nestjs/common';
import { StudentModule } from './controller/student/student.module';

@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
