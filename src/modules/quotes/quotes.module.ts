import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [QuotesController],
  providers: [QuotesService, EmailService],
})
export class QuotesModule {}
