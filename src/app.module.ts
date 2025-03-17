import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
	imports: [ConfigModule, PrismaModule, RedisModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
