import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'Damaris@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Damaris' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Encarnacion' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty({ example: 'phone' })
  @IsNotEmpty()
  phone: string;

  @IsString()
  @ApiProperty({ example: '10:00' })
  @IsNotEmpty()
  notification_time: string;

  @IsString()
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  passwordConfirmation: string;
}
