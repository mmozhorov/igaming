import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { InternalError, PublicError } from "../../utils/typed-errors";
import { UserRegistrationService } from './user-registration.service';
import * as dto from "./user-registration.dto";

@Controller('/api/v1')
@ApiTags('user-registration')
export class UserRegistrationController {
  constructor(
      private readonly userRegistrationService: UserRegistrationService,
  ) {}
  @Post('/signup')
  @ApiOperation({ description: 'Create Account' })
  @ApiResponse({
    type: dto.CreateUserAccountResponse
  })
  async createAccount(
    @Body() body: dto.CreateUserAccountRequest
  ): Promise<dto.CreateUserAccountResponse | PublicError> {
    const data = await this.userRegistrationService.createAccount(body);
    if (data instanceof PublicError) {
      return new PublicError(data.message, data.statusCode, data.type);
    }
    else if (data instanceof InternalError) {
      // TODO: handle internal error appropriately
      return new PublicError("Something went wrong", 500, data.type);
    }
    return { data }
  }

  @Get('/me')
  @ApiOperation({ description: 'Get User Info' })
  @ApiResponse({
    type: dto.GetUserInfoResponse
  })
  async getUserInfo(
      @Param() params
  ): Promise<dto.GetUserInfoResponse | PublicError> {
    const data = await this.userRegistrationService.getUserInfo(params.email);
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
