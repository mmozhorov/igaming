import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthorizationModule } from './domains/user-authorization/user-authorization.module';
import { MongoDB } from './utils/secrets';

@Module({
  imports: [MongooseModule.forRoot(MongoDB), UserAuthorizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
