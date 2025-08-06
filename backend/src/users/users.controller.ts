import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.svc.create(name);
  }
}
