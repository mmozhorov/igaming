import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import passport from "passport";
import "../../utils/passportHandler";
import { JWT_SECRET } from "../../utils/secrets";
import { IUser } from "../../models/user";
import {
  PublicError,
  InternalError,
  BadRequestError,
} from "../../utils/typed-errors";

@Injectable()
export class UserAuthorizationService {
  constructor(
      @InjectModel('User') private userModel: Model<IUser>
  ) {}
  public async authenticateUser(body: Partial<IUser>): Promise<string | PublicError | InternalError> {
    try {
      const {
        email,
        username,
        password,
      } = body;
      return await new Promise((resolve, _reject) => {
        passport.authenticate("local", function (err, user, _info) {
          if (err) return new InternalError(err.message);
          if (!user || !email) {
            resolve(new BadRequestError("User not correct"));
          }
          else {
            resolve(jwt.sign({ email }, JWT_SECRET));
          }
        });
      });
    } catch (e) {
      return new InternalError(e.message)
    }
  }
}
