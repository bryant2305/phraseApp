import { Injectable, Request } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class QuotesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async sendRandomQuote(@Request() req: any) {
    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);
    const quote = await this.getRandomQuote().toPromise();
    const email = user.email;
    const userFirstName = user.profile.firstName;
    await this.emailService.sendQuoteEmail(email, quote, userFirstName);
  }

  getRandomQuote(): Observable<any> {
    return this.httpService
      .get('https://api.quotable.io/random')
      .pipe(map((response) => response.data));
  }
}
