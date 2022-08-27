import { Controller, Get, Param, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/confirm/:id')
  confirmEmail(@Param('id') id: string, @Response() res: Res) {
    return this.userService.confirmEmail(id, res);
  }
}
