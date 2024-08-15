import { forwardRef, Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailModule } from 'src/email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule), // Usa forwardRef para resolver la circularidad
    EmailModule,
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
