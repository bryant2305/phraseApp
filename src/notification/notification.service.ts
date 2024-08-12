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
      const response = await this.novu.trigger('demo-recent-login', {
        to: {
          subscriberId: '66b38f8faa4218d126b20170',
          email: 'elokotoknik06@gmail.com',
        },
        payload: {
          loginDate: '2024-08-07T13:45:06.404Z',
          loginDevice: 'Desktop',
          loginLocation: 'London, United Kingdom',
          loginIP: '47.149.53.167',
          userFirstName: 'Jane',
        },
      });

      // Solo devuelve partes del objeto response que necesitas
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
}
