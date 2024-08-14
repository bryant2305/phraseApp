import { Controller, Get } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { privateDecrypt } from 'crypto';
import { EmailService } from 'src/email/email.service';

@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly emailService: EmailService,
  ) {}

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
  @Get('send')
  async sendQuoteByEmail(): Promise<string> {
    const quote = await this.quotesService.getRandomQuote().toPromise();
    const email = 'bryantperezgarcia005@gmail.com'; // Reemplaza con el email del destinatario

    await this.emailService.sendQuoteEmail(email, quote);

    return 'Frase enviada por email exitosamente';
  }
}
