import { Injectable, Inject } from '@nestjs/common';
import {IUser, User, userSchema} from '../models/user';

export interface IUsersRepository {
    findByEmail(email: string): Promise<IUser>;
    create(user: object): Promise<"OK">;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@Inject(userSchema) private readonly usersModel: typeof User) {}

    async findByEmail(email: string): Promise<IUser> {
        return this.usersModel.findOne({ email: email.toLowerCase() });
    }

    async create(user: IUser): Promise<"OK"> {
        await this.usersModel.create({ ...user });
        return "OK";
    }
}
