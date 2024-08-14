// email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async sendQuoteEmail(
    to: string,
    quote: { content: string; author: string },
    req: any,
  ): Promise<void> {
    const userId = req.user.id;
    const user = this.userService.getUserById(userId);
    const userFirstName = (await user).profile.firstName;
    await this.mailerService.sendMail({
      to,
      subject: 'Tu cita diaria',
      template: 'phrase',
      context: {
        content: quote.content,
        author: quote.author,
        firstname: userFirstName,
      },
    });
  }
}
