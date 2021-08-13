import { NestFactory } from '@nestjs/core';
import winston from 'winston/lib/winston/config';
import { AppModule } from './app.module';

const Winston = require('winston');
const WinstonLogStash = require('winston3-logstash-transport');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const logger = Winston.createLogger();
  logger.add(new WinstonLogStash({
    mode: 'udp',
    port: 10167,
    host: '1e3ff6b1-3bec-4cbd-9727-9ed132c407ec-ls.logit.io',
    ssl_enable: true,
    max_connect_retries: -1,
  }));


  logger.log({ message: 'this is log from nodejs' });
  logger.error({ data: 'test-error', message: 'this is log from nodejs' });


  app.useLogger(logger);
  await app.listen(3000);


}
bootstrap();
