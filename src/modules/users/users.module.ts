import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { QuotesModule } from '../quotes/quotes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => EmailModule), // Usa forwardRef para resolver la circularidad
    forwardRef(() => QuotesModule), // Usa forwardRef para resolver la circularidad
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
