import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  // GET /users
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'EDITOR' | 'USER') {
    if (role) return role;
    return [];
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      id,
    };
  }

  // POST /users
  @Post()
  create(@Body() user: object) {
    return user;
  }

  // PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: object) {
    return {
      id,
      ...user,
    };
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      id,
    };
  }
}
