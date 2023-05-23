import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentCommand } from './student.command';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentCommand],
})
export class StudentModule {}
