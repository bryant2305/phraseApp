// email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendQuoteEmail(
    to: string,
    quote: { content: string; author: string },
  ): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Tu cita diaria',
      template: 'phrase',
      context: {
        content: quote.content,
        author: quote.author,
      },
    });
  }
}
