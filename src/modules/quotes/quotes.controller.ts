import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }
  @Get('send')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async sendQuoteByEmail(@Request() req: any) {
    return this.quotesService.sendRandomQuote(req);
  }
}
