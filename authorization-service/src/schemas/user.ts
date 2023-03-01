import { Document, Schema, Model, model, Error } from 'mongoose'
const bcrypt = require('bcryptjs');

export interface IUser extends Document {
  username: string,
  password: string,
  email: string,
}

export const userSchema: Schema = new Schema({
  username: String,
  password: String,
  email: String,
})

userSchema.pre<IUser>('save', function save(next) {
  const user = this;
  bcrypt.hash(this.password, 10, (err: Error, hash: string) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  const user = this as IUser
  bcrypt.compare(candidatePassword, user.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch)
  })
}

export const User: Model<IUser> = model<IUser>('User', userSchema)
