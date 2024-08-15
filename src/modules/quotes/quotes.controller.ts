import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { EmailService } from 'src/email/email.service';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
  ) {}

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
  @Get('send')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async sendQuoteByEmail(@Request() req: any): Promise<string> {
    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);
    const quote = await this.quotesService.getRandomQuote().toPromise();
    const email = user.email;

    await this.emailService.sendQuoteEmail(email, quote, req);

    return 'Frase enviada por email exitosamente';
  }
}
