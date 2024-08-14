import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiBearerAuth()
  // @UseGuards(JwtGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
