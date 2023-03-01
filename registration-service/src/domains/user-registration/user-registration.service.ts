import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/secrets";
import { IUser } from "../../models/user";
import {
  UnauthorizedError,
  BadRequestError,
  PublicError, InternalError,
} from "../../utils/typed-errors";
import {
  UsersRepository,
  IUsersRepository,
} from "../../repositories/users.repository";
import { IAuthorizationRepository } from 'src/repositories/authorization.repository';

@Injectable()
export class UserRegistrationService {
  constructor(
      @Inject('UsersRepository') private readonly usersRepository: IUsersRepository,
      @Inject('AuthorizationRepository') private readonly authorizationRepository: IAuthorizationRepository,
  ) {}
  public async createAccount(body: Partial<IUser>): Promise<string | PublicError | InternalError> {
    try {
      const {
        email,
        username,
        password,
      } = body;
      if (!email) {
        return new UnauthorizedError("Email is not correct")
      }
      const user = await this.usersRepository.findByEmail(email.toLowerCase());
      if (user) {
        return new BadRequestError('Email is already exists');
      }
      await this.usersRepository.create({
        email: email.toLowerCase(),
        username,
        password,
      })
      return jwt.sign({ email }, JWT_SECRET);
    }
    catch (e) {
      return new InternalError(e.message)
    }
  }
  public async getUserInfo(email: string): Promise<IUser | PublicError | InternalError> {
    try {
      if (!email) {
        return new UnauthorizedError("Email is not correct")
      }
      const user = await this.authorizationRepository.getUserInfo(email.toLowerCase());
      if (user) {
        return new BadRequestError('Email is already exists');
      }
      return user;
    }
    catch (e) {
      return new InternalError(e.message)
    }
  }
}
