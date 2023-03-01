import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { InternalError, PublicError } from "../../utils/typed-errors";
import { UserAuthorizationService } from './user-authorization.service';
import * as dto from "./user-authorization.dto";

@Controller('/api/user-authorization')
@ApiTags('user-authorization')
export class UserAuthorizationController {
  constructor(
      private readonly userAuthorizationService: UserAuthorizationService
  ) {}
  @Post('/user/login')
  @ApiOperation({ description: 'Login and return token' })
  @ApiResponse({
    type: dto.LoginUserResponse
  })
  async createAccount(
    @Body() body: dto.LoginUserRequest
  ): Promise<dto.LoginUserResponse | PublicError> {
    const data = await this.userAuthorizationService.authenticateUser(body);
    if (data instanceof PublicError) {
      return new PublicError(data.message, data.statusCode, data.type);
    }
    else if (data instanceof InternalError) {
      // TODO: handle internal error appropriately
      return new PublicError("Something went wrong", 500, data.type);
    }
    return { data }
  }
}
