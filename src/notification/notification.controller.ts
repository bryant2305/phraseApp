import { Controller, Get, Request } from '@nestjs/common';

import { NotificationService } from './notification.service';

@Controller('novu')
export class NovuNotificationController {
  constructor(private readonly novuNotificationsService: NotificationService) {}

  // @ApiTags('notify-me')
  // @ApiBearerAuth()
  @Get()
  async sendNotification(@Request() req: any) {
    // const userId = req.user.id;
    return this.novuNotificationsService.sendNotification();
  }
}
