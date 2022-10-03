import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log("Data Received:", data)
    console.log(`Pattern: ${context.getPattern()}`);
    const message = context.getMessage();
    return true
  }
}
