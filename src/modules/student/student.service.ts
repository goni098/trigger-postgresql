import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Client } from 'pg';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  // async onModuleInit() {
  //   await this.postgresChangeListener();
  //   await this.postgresTrigger();
  //   // const pgClient = new Client({
  //   //   connectionString: process.env.DATABASE_URL,
  //   // });
  //   // await pgClient.connect();
  //   // await pgClient.query('LISTEN log_change');

  //   // pgClient.on('notification', (notification) => {
  //   //   const payload = notification.payload;
  //   //   console.log(`Received notification: ${payload}`);
  //   // });
  // }

  // private async postgresTrigger() {
  //   return this.prisma.$executeRaw`
  //       CREATE OR REPLACE TRIGGER log_change
  //       AFTER INSERT ON students
  //       FOR EACH ROW
  //       --WHEN (OLD.* IS DISTINCT FROM NEW.*)
  //       EXECUTE PROCEDURE change_listener();
  //   `;
  // }

  // private async postgresChangeListener() {
  //   return this.prisma.$executeRaw`
  //       CREATE OR REPLACE FUNCTION change_listener()
  //       RETURNS TRIGGER AS $$
  //       BEGIN
  //           PERFORM pg_notify('log_change', row_to_json(NEW)::text);
  //           RETURN NEW;
  //       END;
  //       $$ LANGUAGE plpgsql;
  //   `;
  // }
}
