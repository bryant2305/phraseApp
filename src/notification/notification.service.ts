import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';
@Injectable()
export class NotificationService {
  private readonly novu: Novu;

  constructor() {
    this.novu = new Novu(process.env.NOVU_API_KEY);
  }

  async sendNotification() {
    try {
      // const user = await this.userService.getUserById(userId);
      // if (!user) {
      //   throw new Error(`User with ID ${userId} not found`);
      // }

      // const profile = user.profile;
      // if (!profile) {
      //   throw new Error(`Profile for user with ID ${userId} not found`);
      // }
      // const email = user.email;
      // if (!email) {
      //   throw new Error(`email not found`);
      // }

      // const formattedPhoneNumber = this.utilsService.validateNumber(
      //   profile.phone,
      // );

      const response = await this.novu.trigger('demo-verify-otp', {
        to: {
          subscriberId: '66b38f8faa4218d126b20170',
          email: 'bryantperezgarcia005@gmail.com',
          phone: 'formattedPhoneNumber,',
        },
        payload: {
          validationCode: 123456,
          magicLinkURL: 'https://slack.com/magic/link',
          __source: 'studio-test-workflow',
        },
      });

      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
}
