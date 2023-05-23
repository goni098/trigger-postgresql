import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      /* eslint-disable */
      console.log('#Query: ', event.query);
      console.log('#Params: ', event.params);
      console.log('#Duration: ', event.duration);
      console.log('####################################################33');
    });

    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
