import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NovuNotificationController } from './notification.controller';

@Module({
  controllers: [NovuNotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
