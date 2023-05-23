import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './modules/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cmm() {
    await this.prisma.student.create({
      data: {
        age: Math.floor(Math.random() * (90 - 1 + 1) + 1),
        name: (Math.random() + 1).toString(36).substring(7),
        class: (Math.random() + 1).toString(36).substring(4),
      },
    });
  }
}
