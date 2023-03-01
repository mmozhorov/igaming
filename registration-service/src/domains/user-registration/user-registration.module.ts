import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';
import { User, userSchema } from "../../models/user";
import { UsersRepository } from "../../repositories/users.repository";
import { AuthorizationRepository } from 'src/repositories/authorization.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
    ])
  ],
  controllers: [UserRegistrationController],
  providers: [
    UserRegistrationService,
    { provide: 'UsersRepository', useClass: UsersRepository },
    { provide: 'AuthorizationRepository', useClass: AuthorizationRepository },
  ],
})
export class UserRegistrationModule{}
