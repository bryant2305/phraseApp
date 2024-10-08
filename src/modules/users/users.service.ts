import { Injectable, HttpException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { QuotesService } from '../quotes/quotes.service';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => QuotesService)) // Usa forwardRef para resolver la circularidad
    private readonly quoteService: QuotesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const found = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (found) {
      throw new HttpException('Ya existe un usuario con este correo', 500);
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new HttpException(
        'password and password confirmation must be the same',
        400,
      );
    }
    try {
      const createUser: any = {
        ...createUserDto,
        profile: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          phone: createUserDto.phone,
          notification_time: createUserDto.notification_time,
        },
      };
      await this.userRepository.save(createUser);

      const quote = await lastValueFrom(this.quoteService.getRandomQuote());
      await this.emailService.sendFirstQuoteEmail(
        createUserDto.email,
        quote,
        createUser.profile.firstName,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, passwordConfirmation, ...userResponse } = createUserDto;

      return userResponse;
    } catch (error) {
      throw new HttpException('Error al crear el usuario', 500);
    }
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }
  // En tu servicio de usuarios
  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
