import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: config.get<number>('MAIL_PORT'),
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM_ADDRESS')}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'src', 'email', 'templates'), // Ajusta esto según tu estructura de carpetas
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule), // Usa forwardRef para resolver la circularidad
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
