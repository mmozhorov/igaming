import { Injectable } from '@nestjs/common';
import axios from "axios";
import { IUser } from "../models/user";
import { AUTH_URL } from "../utils/secrets";
import { BAD_REQUEST_ERROR, PublicError } from "../utils/typed-errors";

export interface IAuthorizationRepository {
    getUserInfo(email: string): Promise<IUser | PublicError>;
}

@Injectable()
export class AuthorizationRepository implements IAuthorizationRepository {
    constructor(
        private readonly authUrl = AUTH_URL
    ) {}

    async getUserInfo(email: string): Promise<IUser | PublicError> {
        const { data, status, statusText } = await axios.get<IUser>(
            `${this.authUrl}/me`,
            {
                params: { email },
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        if (status === 200) {
            return data;
        }
        return new PublicError(statusText, status, BAD_REQUEST_ERROR.type);
    }

}
