import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserAuthorizationController } from './user-authorization.controller';
import { UserAuthorizationService } from './user-authorization.service';
import {User, userSchema} from "../../schemas/user";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
    ])
  ],
  controllers: [UserAuthorizationController],
  providers: [UserAuthorizationService],
})
export class UserAuthorizationModule {}
