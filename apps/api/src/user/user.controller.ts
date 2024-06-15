import { ROUTES, SERVICES } from '@app/utils/constants';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { InferredUser } from '../database/schema/user.schema';
import { Pagination } from '@app/database/database.service';

@ApiTags(ROUTES.USER.toUpperCase())
@Controller(ROUTES.USER)
export class UserController {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get All Users',
  })
  @ApiResponse({
    status: 200,
    description: '**OK**',
  })

  /**
   * TODO:
   * Add query params and param validation
   */
  async findAll(): Promise<{ data: InferredUser[]; pagination: Pagination }> {
    return await this.userService.find({
      limit: 10,
      page: 1,
    });
  }
}
