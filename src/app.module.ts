import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { TokenModule } from './modules/token/token.module';
import {NotificationsModule} from "./modules/notifications/notifications.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
	imports: [ConfigModule, PrismaModule, RedisModule, TokenModule, NotificationsModule, UserModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
