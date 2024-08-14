import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [HttpModule],
  controllers: [QuotesController],
  providers: [QuotesService, EmailService],
})
export class QuotesModule {}
