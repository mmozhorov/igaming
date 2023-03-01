import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { InternalError, PublicError } from "../../utils/typed-errors";
import { UserRegistrationService } from './user-registration.service';
import * as dto from "./user-registration.dto";

@Controller('/api/user-registration')
@ApiTags('user-registration')
export class UserRegistrationController {
  constructor(
      private readonly userRegistrationService: UserRegistrationService
  ) {}
  @Post('/user/account')
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
}
