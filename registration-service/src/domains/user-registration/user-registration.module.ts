import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';
import {User, userSchema} from "../../schemas/user";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
    ])
  ],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
})
export class UserRegistrationModule{}
