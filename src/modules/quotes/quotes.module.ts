import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { UsersModule } from '../users/users.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [HttpModule, UsersModule, EmailModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
