import { Controller, Get, PlainLiteralObject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): PlainLiteralObject {
    return { mes: 'w' };
  }
}
