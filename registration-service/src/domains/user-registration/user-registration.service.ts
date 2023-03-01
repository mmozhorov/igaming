import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { JWT_SECRET } from "../../utils/secrets";
import { IUser } from "../../schemas/user";
import {
  UnauthorizedError,
  BadRequestError,
  PublicError, InternalError,
} from "../../utils/typed-errors";

@Injectable()
export class UserRegistrationService {
  constructor(
      @InjectModel('User') private userModel: Model<IUser>
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
      const user = await this.userModel.findOne({ email: email.toLowerCase() });
      if (user) {
        return new BadRequestError('Email is already exists');
      }
      await this.userModel.create({
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
}
