// quote-scheduler.service.ts

import { Injectable, Logger } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { QuotesService } from './quotes.service';
import { EmailService } from 'src/email/email.service';
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class QuoteSchedulerService {
  private readonly logger = new Logger(QuoteSchedulerService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly quotesService: QuotesService,
    private readonly emailService: EmailService,
  ) {}

  @Cron('0 9 * * *') // Se ejecuta todos los días a las 9:00 AM
  async sendScheduledQuotes() {
    const users = await this.usersService.findAll();

    for (const user of users) {
      try {
        // Convertimos el Observable a una promesa y esperamos a que se resuelva
        const quote = await lastValueFrom(this.quotesService.getRandomQuote());
        await this.emailService.sendQuoteEmail(
          user.email,
          quote, // Aquí 'quote' es un objeto que contiene 'content' y 'author'
          user.profile.firstName,
        );
      } catch (error) {
        console.error('Error sending quote email:', error);
      }
    }
  }
}
