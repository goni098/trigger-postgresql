import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [ScheduleModule.forRoot(), StudentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
