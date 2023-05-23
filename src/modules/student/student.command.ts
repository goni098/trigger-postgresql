import { OnModuleInit } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import createPostgresSubscriber from 'pg-listen';
import { PrismaService } from '../prisma/prisma.service';
import { Client } from 'pg';

@Command({ name: 'student-process' })
export class StudentCommand extends CommandRunner implements OnModuleInit {
  private subscriber: ReturnType<typeof createPostgresSubscriber>;

  constructor(private prisma: PrismaService) {
    super();
    this.subscriber = createPostgresSubscriber({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async onModuleInit() {
    await this.postgresChangeListener();
    await this.postgresTrigger();
  }

  async run(): Promise<void> {
    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await pgClient.connect();
    await pgClient.query('LISTEN log_change');

    pgClient.on('notification', (notification) => {
      const payload = notification.payload;
      console.log(`Received notification: ${payload}`);
    });
  }

  private async postgresTrigger() {
    return this.prisma.$executeRaw`
        CREATE OR REPLACE TRIGGER log_change 
        AFTER INSERT OR DELETE OR UPDATE ON students
        FOR EACH ROW 
        --WHEN (OLD.* IS DISTINCT FROM NEW.*)
        EXECUTE PROCEDURE change_listener();
    `;
  }

  private async postgresChangeListener() {
    return this.prisma.$executeRaw`
        CREATE OR REPLACE FUNCTION change_listener()
        RETURNS TRIGGER AS $$
        BEGIN
            PERFORM pg_notify('log_change', row_to_json(NEW)::text);
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `;
  }
}
