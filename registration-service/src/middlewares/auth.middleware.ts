import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import '../utils/passport-handler';

const passport = require('passport');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err, user, _info) {
      if (err) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      } else {
        req.user = user;
        res.locals.user = user;
        return next()
      }
    })(req, res, next)
  }
}
