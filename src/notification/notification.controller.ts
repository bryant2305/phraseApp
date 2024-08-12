import { Controller, Get, Request } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@Controller('novu-notifications')
export class NovuNotificationController {
  constructor(private readonly novuNotificationsService: NotificationService) {}

  @ApiTags('notify-me')
  @ApiBearerAuth()
  @Get('send')
  async sendNotification(@Request() req: any) {
    // const userId = req.user.id;
    return this.novuNotificationsService.sendNotification();
  }
}
