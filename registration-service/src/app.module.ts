import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRegistrationModule } from './domains/user-registration/user-registration.module';
import { MongoDB } from './utils/secrets';

@Module({
  imports: [MongooseModule.forRoot(MongoDB), UserRegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
